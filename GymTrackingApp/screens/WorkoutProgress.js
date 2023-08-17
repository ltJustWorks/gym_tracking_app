import { useIsFocused, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { View, FlatList, TextInput, Button, Text, Alert, TouchableOpacity } from "react-native"
import { getData, saveData } from "../storage/dataHelper"
import styles from "../styles/styles"
import Icon from 'react-native-vector-icons/FontAwesome'
import RoundButton from "../components/RoundButton"

const onChangeSet = (set_no, new_weight, new_reps, sets, changeSets) => {
    new_sets = JSON.parse(JSON.stringify(sets))
    for (let s of new_sets) {
        if (s.set_no === set_no) {
            s.weight = new_weight
            s.reps = new_reps
        } 
    }
    changeSets(new_sets)
}

const onRemoveSet = (set_no, sets, changeSets) => {
    let new_sets = sets.filter((set) => set["set_no"] !== set_no)
    new_sets = new_sets.map((set) => {
        if (set["set_no"] > set_no) {
            return {...set, set_no: set["set_no"]-1}
        }
        else {return set}
    })
    changeSets(new_sets)
}

const onRemoveExercise = (exercise, workoutObj, setWorkoutObj) => {
    const {[exercise]: _, ...filteredObj} = workoutObj 
    console.log("new obj:", filteredObj)
    setWorkoutObj(filteredObj)
}

const EditableSet = ({set, sets, changeSets, lastWeight, lastReps, setEnteredWeight, setEnteredReps, exercise, workoutObj, setWorkoutObj}) => {
    const [currWeight, setCurrWeight] = useState('')
    const [currReps, setCurrReps] = useState('')

    return (
            <View style={{padding:5, backgroundColor:"#c0c3c6", borderRadius:20, margin:4}}>
            <Text style={styles.subtext}>Set {set.set_no}</Text>
            <View style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
                <View style={styles.setRow}>
                <View style={styles.setEntry}>
                    <TextInput 
                        style={styles.subtext2}
                        placeholder={lastWeight.toString()}
                        value={currWeight}
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                            setCurrWeight(text)
                            setEnteredWeight(text)
                            onChangeSet(set.set_no, parseInt(text), set.reps, sets, changeSets)
                    }}

                    />
                    <Text style={styles.subtext2}>lbs</Text>
                </View>

                <View style={styles.setEntry}>
                    <TextInput
                        style={styles.subtext2}
                        placeholder={lastReps.toString()}
                        value={currReps}
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                            setCurrReps(text)
                            setEnteredReps(text)
                            onChangeSet(set.set_no, set.weight, parseInt(text), sets, changeSets)
                        }}
                    />
                    <Text style={styles.subtext2}>Reps</Text>
                </View>
            </View>
                <TouchableOpacity 
                    style={{flex:1, flexGrow:1, flexDirection:"row", 
                    justifyContent:"flex-end", alignItems:"center", padding:10}} 
                    onPress={() => {
                        if (sets.length === 1) {
                            // Implement something for removing last exercise
                            Alert.alert("Attention", "Are you sure you want to remove the exercise?", [
                                {text: "Yes", onPress: () => onRemoveExercise(exercise, workoutObj, setWorkoutObj)}, 
                                {text: "No", onPress: () => {}}
                            ])
                        }
                        else {onRemoveSet(set.set_no, sets, changeSets)}
                    }}
                >
                    <Icon name='close'
                        size={20} color="#fc0303"
                    />
                </TouchableOpacity>
            </View>
            </View>
    )
}

const addSet = (sets, changeSets) => {
    let newSets = JSON.parse(JSON.stringify(sets))
    let setNum, weight, reps
    if (sets.length === 0) {
        setNum = 1
        weight = 0
        reps = 0
    }
    else {
        setNum = sets[sets.length-1].set_no + 1
        weight = sets[sets.length-1].weight
        reps = sets[sets.length-1].reps // TODO: Use weight and reps of previous set instead of first set
    }
    newSets = [...newSets, {
        set_no: setNum,
        weight: weight, // TODO: Figure out how to get previous reps, sets and weight from workout history
        reps: reps
    }]
    changeSets(newSets)
}



const Exercise = ({exercise, workoutObj, setWorkoutObj}) => {
    const [lastWeight, setLastWeight] = useState('0')
    const [lastReps, setLastReps] = useState('0')

    const [enteredWeight, setEnteredWeight] = useState('')
    const [enteredReps, setEnteredReps] = useState('')

    let sets = workoutObj[exercise]
    const changeSets = (newSets) => {
        const newWorkoutObj = Object.fromEntries(
            Object.entries(workoutObj).map(([key, value]) => {
                if (key === exercise) {
                    return [key, newSets]
                }
                else {
                    return [key, value]
                }
            }) 
        )
        setWorkoutObj(newWorkoutObj)
    }

    /*
    Form: 
    [
        {
            set_no: 1,
            weight: ...,
            reps: ...,
        }, ...
    ]

    */ 

    return (
        <View style={styles.template}>
            <Text style={styles.itemtitle}>{exercise}</Text>
            <FlatList 
                data={sets}
                renderItem={({item}) => {
                    return <EditableSet 
                        set={item} 
                        sets={sets} 
                        changeSets={changeSets} 
                        lastWeight={lastWeight}
                        lastReps={lastReps}
                        setEnteredWeight={setEnteredWeight}
                        setEnteredReps={setEnteredReps}
                        exercise={exercise}
                        workoutObj={workoutObj}
                        setWorkoutObj={setWorkoutObj}
                    />}}
            /> 
            <View style={{borderRadius:20, overflow:"hidden"}}>
            <Button
                title="Add a set"
                onPress={() => {
                    if (!enteredReps || !enteredWeight) {
                        Alert.alert("Error", "Please enter a valid weight/reps.")
                    }
                    else {
                        addSet(sets, changeSets)
                        setLastReps(enteredReps)
                        setLastWeight(enteredWeight)
                        // Alert if entered weight/reps is empty
                    }
                }}
            />
            </View>
        </View>
        )
}

const initializeWorkoutObj = (workoutObj, selectedExercises) => {
    const newWorkoutObj = JSON.parse(JSON.stringify(workoutObj))
    for (let exercise of selectedExercises) {
        if (!newWorkoutObj[exercise]) {
            newWorkoutObj[exercise] = [{set_no: 1, weight: 0, reps: 0}]
        }
    }
    return newWorkoutObj
}

const WorkoutProgress = ({route, navigation}) => {
    /* Hierarchy:
    Workout Progress -> Exercise -> Editable Set
    How to add new set?
     * Store sets in stateful component
    */ 
    const selectedExercises = route.params.exercises
    const defaultWorkoutObj = route.params.workoutObj 
        ? initializeWorkoutObj(route.params.workoutObj, selectedExercises) : {}

    const [workoutObj, setWorkoutObj] = useState(defaultWorkoutObj)
    const isFocused = useIsFocused()

    useEffect(() => {
        setWorkoutObj(initializeWorkoutObj(defaultWorkoutObj, selectedExercises))
    }, [isFocused])
    
    /* 
        {
            exercise_name: [{set_no: ...},...],
            ...
        }
    */

    return (
        <View style={styles.dividerContainer}>
            <FlatList
                data={Object.keys(workoutObj)}
                renderItem={({item}) => {
                    //const newWorkoutObj = {...workoutObj, item: []}   Don't set keys with vars like this
                    return(<Exercise exercise={item} workoutObj={workoutObj} setWorkoutObj={setWorkoutObj} />)
                }}
            />
            <RoundButton title="Quick Add Exercise" onPress={
                () => navigation.navigate("Quick Add Exercise", {
                    workoutObj: workoutObj
                })} /> 
            <View style={{borderRadius:20, overflow:"hidden", margin:4, backgroundColor:'transparent'}}>
            <Button
                title="Finish workout"
                onPress={() => onFinishWorkout(workoutObj, navigation)}
            />
            </View>
        </View>
    )
}

const onFinishWorkout = (workoutObj, navigation) => {
    getData("workout_history")
        .then((res) => {
            // 
            //    historyObj: 
            //    {
            //        <Date object>: {exercise: [{reps: .., set_no: .., weight: ..}], ...},
            //        ...
            //    }

            let newHistoryObj
            if (!res) {
                newHistoryObj = {}
            }
            else {
                newHistoryObj = res
            }
            const date = new Date()
            newHistoryObj[date.toISOString()] = workoutObj // use Date.parse() to get back Date obj
            return newHistoryObj
        })
        .then((newHistoryObj) => {
            saveData("workout_history", newHistoryObj)
        })

    navigation.navigate("Main Menu")
}

export default WorkoutProgress