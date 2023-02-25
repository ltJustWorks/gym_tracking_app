import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
import styles from '../styles/styles'

const addExercise = (newExerciseName, exerciseTemplate, setExerciseTemplate) => {
    setExerciseTemplate([...exerciseTemplate, newExerciseName])
}

const ExerciseSelection = ({item, exerciseTemplate, setExerciseTemplate}) => {
    const {name} = item
    return (
        <View>
            <Text>{name}</Text>
            <Button 
                title="Add exercise"
                onPress={() => {addExercise(name, exerciseTemplate, setExerciseTemplate)}}
            />
        </View>
    )
}

const onSaveTemplate = (template, navigation) => {
    getData("templates")
        .then((templatesList) => {
            return [...templatesList, template]
        })
        .then((newTemplatesList) => {
            //console.log("new templates list:", newTemplatesList)
            saveData("templates", newTemplatesList)
        })
        .then(() => navigation.navigate("ExerciseTemplateList"))

}

const NewTemplateForm = ({navigation}) => {
    const [exerciseTemplate, setExerciseTemplate] = useState([])
    const [exerciseList, setExerciseList] = useState([])

    useEffect(() => {
        getData("exercises")
            .then((val) => setExerciseList(val))
    }, [])

    useEffect(() => console.log("template updated:", exerciseTemplate), [exerciseTemplate])

    return (
        <View>
            <Text style={styles.title}>Exercise List</Text>

            <FlatList 
                data = {exerciseList}
                renderItem = {({item}) => {
                    return (
                        <ExerciseSelection 
                            item={item} 
                            exerciseTemplate={exerciseTemplate} 
                            setExerciseTemplate={setExerciseTemplate} 
                        />
                    )
                }}
            />

            <Text style={styles.title}>Added Exercises</Text>
            <FlatList
                data={exerciseTemplate}
                renderItem={({item}) => <Text>{item}</Text>}
            />

            <Button 
                title="Save template"
                onPress={() => onSaveTemplate(exerciseTemplate, navigation)}
            />
        </View>
    )
}

export default NewTemplateForm