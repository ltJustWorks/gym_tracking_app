import { useIsFocused, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { View, FlatList, TextInput, Button, Text } from "react-native"
import { getData } from "../storage/dataHelper"
import styles from "../styles/styles"

/*
const onChangeSet = (set_no, new_weight, new_reps, sets, setSets) => {
    new_sets = JSON.parse(JSON.stringify(sets))
    for (s of new_sets) {
        if (s.set_no === set_no) {
            s.weight = parseInt(new_weight)
            s.reps = parseInt(new_reps)
        } 
    setSets(new_sets)
    }
}
*/

const EditableSet = ({set, exercise, sets, setSets}) => {
    const [currWeight, setCurrWeight] = useState('')
    const [currReps, setCurrReps] = useState('')
    const prevWeight = set.weight
    const prevReps = set.reps

    console.log("set:", set.set_no)

    return (
        <View>
            <Text>{exercise.name} Set {set.set_no}</Text>
            <View style={styles.setRow}>
                <TextInput
                    placeholder={prevWeight}
                    value={currWeight}
                    keyboardType="number-pad"
                    onChangeText={(text) => setCurrWeight(text)}
                />
                <Text>lbs</Text>
            </View>

            <View style={styles.setRow}>
                <TextInput
                    placeholder={prevReps}
                    value={currReps}
                    keyboardType="number-pad"
                    onChangeText={(text) => setCurrReps(text)}
                />
                <Text>Reps</Text>
            </View>
        </View>
    )
}

const createSets = (exercise, setSets) => {
    let newSets = []
        for (let i = 0; i < exercise.sets; i++) {
            newSets = [...newSets, {
                set_no: i+1,
                weight: exercise.weight,
                reps: exercise.reps
            }]
        }
    setSets(newSets)
}

const Exercise = (props) => {
    const isFocused = useIsFocused()

    const [sets, setSets] = useState([])
    const exercise = props.exercise

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
        createSets(exercise, setSets)
    }, [isFocused])

    return (
        <FlatList 
            data={sets}
            renderItem={({item}) => {
                return <EditableSet set={item} exercise={exercise} sets={sets} setSets={setSets} />}}
        /> 
    )
}

const findReferenceExercise = (referenceExercises, selectedExerciseName) => {
    // TODO: Implement this with id instead of name
    for (let i = 0; i < referenceExercises.length; i++) {
        let ex = referenceExercises[i]
        if (ex.name === selectedExerciseName) {
            return ex
        }
    }
}

const WorkoutProgress = ({navigation}) => {
    /* Hierarchy:
    Workout Progress -> Exercise -> Editable Set
    How to add new set?
     * Store sets in stateful component
    */ 
    const isFocused = useIsFocused()
    const route = useRoute()
    const selectedExercises = route.params?.exercises
    const [referenceExercises, setReferenceExercises] = useState([])

    useEffect(() => {
        getData("exercises")
            .then((val) => {
                setReferenceExercises(val)
            })
    }, [isFocused])

    if (referenceExercises.length === 0) {
        return <Text>Loading...</Text>
    }

    return (
        <View>
            <FlatList
                data={selectedExercises}
                renderItem={({item}) => {
                    const exercise = findReferenceExercise(referenceExercises, item)
                    return(<Exercise exercise={exercise}/>)
                }}
            />
        </View>
    )
}

export default WorkoutProgress