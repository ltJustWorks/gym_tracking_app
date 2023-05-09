import { useIsFocused, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { View, FlatList, TextInput, Button, Text, Alert } from "react-native"
import { getData, saveData } from "../storage/dataHelper"
import styles from "../styles/styles"

const onChangeSet = (set_no, new_weight, new_reps, sets, changeSets) => {
    new_sets = JSON.parse(JSON.stringify(sets))
    for (s of new_sets) {
        if (s.set_no === set_no) {
            s.weight = new_weight
            s.reps = new_reps
        } 
    }
    changeSets(new_sets)
}

const EditableSet = ({set, sets, changeSets}) => {
    const [currWeight, setCurrWeight] = useState('')
    const [currReps, setCurrReps] = useState('')
    const prevWeight = set.weight
    const prevReps = set.reps

    return (
        <View>
            <Text style={styles.subtext}>Set {set.set_no}</Text>
            <View style={styles.setRow}>
            <View style={styles.setEntry}>
                <TextInput 
                    style={styles.subtext2}
                    placeholder={prevWeight.toString()}
                    value={currWeight}
                    keyboardType="number-pad"
                    onChangeText={(text) => setCurrWeight(text)}

                />
                <Text style={styles.subtext2}>lbs</Text>
            </View>

            <View style={styles.setEntry}>
                <TextInput
                    style={styles.subtext2}
                    placeholder={prevReps.toString()}
                    value={currReps}
                    keyboardType="number-pad"
                    onChangeText={(text) => setCurrReps(text)}
                />
                <Text style={styles.subtext2}>Reps</Text>
            </View>
                <Button 
                    title="✅" 
                    onPress={() => {
                        if (!(currWeight === '' || currReps === '')) {
                            onChangeSet(set.set_no, parseInt(currWeight), parseInt(currReps), sets, changeSets)
                        }
                        else {
                            Alert.alert('Empty weight/reps', 'Please enter valid weight/reps')
                        }
                    }}
                />
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
    const isFocused = useIsFocused()

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

    useEffect(() => {
        addSet(sets, changeSets)
    }, [isFocused])

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
                    />}}
            /> 
            <Button
                title="Add a set"
                onPress={() => addSet(sets, changeSets)}
            />
        </View>
        )
}

const WorkoutProgress = ({navigation}) => {
    /* Hierarchy:
    Workout Progress -> Exercise -> Editable Set
    How to add new set?
     * Store sets in stateful component
    */ 
    const route = useRoute()
    const selectedExercises = route.params?.exercises
    console.log(selectedExercises)

    const [workoutObj, setWorkoutObj] = useState({})

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
                    const newWorkoutObj = {...workoutObj}
                    if (!newWorkoutObj[item]) {
                        newWorkoutObj[item] = []
                    }
                    return(<Exercise exercise={item} workoutObj={newWorkoutObj} setWorkoutObj={setWorkoutObj} />)
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
    console.log("marker", workoutObj)
    getData("workout_history")
        .then((res) => {
            /* 
                historyObj: 
                {
                    <Date object>: {exercise: [{reps: .., set_no: .., weight: ..}], ...},
                    ...
                }
            */

            let newHistoryObj
            if (!res) {
                newHistoryObj = {}
            }
            else {
                newHistoryObj = res
            }
            const date = new Date()
            newHistoryObj[date.toISOString()] = workoutObj // use Date.parse() to get back Date obj
            console.log("marker", newHistoryObj)
            return newHistoryObj
        })
        .then((newHistoryObj) => {
            saveData("workout_history", newHistoryObj)
        })

    navigation.navigate("Main Menu")
}

export default WorkoutProgress