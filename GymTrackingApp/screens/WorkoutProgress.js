import { useIsFocused, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { View, FlatList, TextInput, Button, Text, Alert, TouchableOpacity } from "react-native"
import { getData, saveData } from "../storage/dataHelper"
import styles from "../styles/styles"

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
    console.log("marker", new_sets)
}

const EditableSet = ({set, sets, changeSets, lastWeight, lastReps, setEnteredWeight, setEnteredReps}) => {
    const [currWeight, setCurrWeight] = useState('')
    const [currReps, setCurrReps] = useState('')

    return (
            <View>
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
                    style={{flex:1, flexGrow:1, flexDirection:"row", justifyContent:"flex-end", alignItems:"center",}} 
                    onPress={() => {
                        if (sets.length === 1) {
                            Alert.alert("Error", "You can't remove the first set.")
                        }
                        else {onRemoveSet(set.set_no, sets, changeSets)}
                    }}
                >
                    <Text>❌</Text>
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
    console.log("marker", newSets)
    changeSets(newSets)
}



const Exercise = ({exercise, workoutObj, setWorkoutObj}) => {
    const isFocused = useIsFocused()

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
                    />}}
            /> 
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
        )
}

const initializeWorkoutObj = (workoutObj, selectedExercises) => {
    const newWorkoutObj = {}
    for (let exercise of selectedExercises) {
        newWorkoutObj[exercise] = [{set_no: 1, weight: 0, reps: 0}]
    }
    return newWorkoutObj
}

const WorkoutProgress = ({navigation}) => {
    /* Hierarchy:
    Workout Progress -> Exercise -> Editable Set
    How to add new set?
     * Store sets in stateful component
    */ 
    const route = useRoute()
    const selectedExercises = route.params?.exercises

    const [workoutObj, setWorkoutObj] = useState(initializeWorkoutObj({}, selectedExercises))

    /* 
        {
            exercise_name: [{set_no: ...},...],
            ...
        }
    */



    return (
        <View style={styles.dividerContainer}>
            <FlatList
                data={selectedExercises}
                renderItem={({item}) => {
                    //const newWorkoutObj = {...workoutObj, item: []}   Don't set keys with vars like this
                    return(<Exercise exercise={item} workoutObj={workoutObj} setWorkoutObj={setWorkoutObj} />)
                }}
            />
            <Button
                title="Finish workout"
                onPress={() => onFinishWorkout(workoutObj, navigation)}
            />
        </View>
    )
}

const onFinishWorkout = (workoutObj, navigation) => {
    console.log("marker 2", workoutObj)
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