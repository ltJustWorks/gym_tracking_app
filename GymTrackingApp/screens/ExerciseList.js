import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Button } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { getData, saveData } from '../storage/dataHelper'
import styles from '../styles/styles'

const onRemoveExercise = (exerciseName, exerciseList, setExerciseList) => {
    let newExerciseList = JSON.parse(JSON.stringify(exerciseList))
    const updatedList = newExerciseList.filter(exercise => exercise.name !== exerciseName)
    saveData("exercises", updatedList)
        .then(setExerciseList(updatedList))
        .catch(e => console.error(e))
}

const ExerciseItem = ({name, sets, reps, weight, exerciseList, setExerciseList}) => {
    return (
        <View style={styles.exerciseContainer}>
            <Text style={styles.itemtitle}>{name}</Text>
            <Text style={styles.subtext}>{sets} sets</Text>
            <Text style={styles.subtext}>{reps} reps</Text>
            <Text style={styles.subtext}>{weight} lbs</Text>
            <Button
                title="Remove exercise"
                onPress={() => onRemoveExercise(name, exerciseList, setExerciseList)} //TODO: Reimplement with id instead
            />
        </View>
    )
}

const renderExerciseItem = (item, exerciseList, setExerciseList) => {
    return (
        <ExerciseItem 
            name={item.name} 
            sets={item.sets} 
            reps={item.reps}
            weight={item.weight}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
        />
    )
}

const NewExerciseButton = ({navigation}) => {
    return (
            <Button
                title="Add New Exercise"
                onPress={() => {navigation.navigate("NewExerciseForm")}}
            />
    )
}

const ExerciseList = ({navigation}) => {
    const isFocused = useIsFocused()
    const [exerciseList, setExerciseList] = useState([])

    useEffect(() => {
        getData("exercises")
        .then((val) => {
            console.log("exercise list:", val)
            setExerciseList(val)
        })
    }, [isFocused])

    if (exerciseList.length === 0) {
        return (
            <View style={styles.dividerContainer}>
                <View>
                    <Text style={styles.title}>Exercises</Text>
                    <Text style={styles.itemtitle}>No exercises, add some to start</Text>
                </View>
                <NewExerciseButton navigation={navigation} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercises</Text>
            <FlatList
                data={exerciseList}
                renderItem={({item}) => renderExerciseItem(item, exerciseList, setExerciseList)}
            />
            <NewExerciseButton navigation={navigation} />
        </View>
    )
}

export default ExerciseList