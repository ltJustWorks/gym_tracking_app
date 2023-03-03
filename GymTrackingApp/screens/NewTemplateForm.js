import React, { useState, useEffect, useId } from 'react'
import { View, Text, TextInput, Button, FlatList } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
//import { v4 as uuidv4 } from 'uuid'
import styles from '../styles/styles'

const addExercise = (newExerciseName, templateObj, setTemplateObj) => {
    let newTemplateObj = JSON.parse(JSON.stringify(templateObj)) // TODO: find a better way to deep copy (or avoid altogether)
    newTemplateObj.exercises = [...newTemplateObj.exercises, newExerciseName] // TODO: implement exercise with ids instead
    setTemplateObj(newTemplateObj)
}

const ExerciseSelection = ({item, templateObj, setTemplateObj}) => {
    const {name} = item
    return (
        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.subtext}>{name}</Text>
            <Button 
                title="Add exercise"
                onPress={() => {addExercise(name, templateObj, setTemplateObj)}}
            />
        </View>
    )
}

const onSaveTemplate = (templateObj, navigation) => {
    getData("templates")
        .then((templatesList) => {
            return [...templatesList, templateObj]
        })
        .then((newTemplatesList) => {
            //console.log("new templates list:", newTemplatesList)
            saveData("templates", newTemplatesList)
        })
        .then(() => navigation.navigate("Exercise Template List"))

}

const ExerciseList = ({exerciseList, templateObj, setTemplateObj}) => {
    return (
        <View>
            <Text style={styles.title}>Exercise List</Text>

            <FlatList 
                data = {exerciseList}
                renderItem = {({item}) => {
                    return (
                        <ExerciseSelection 
                            item={item} 
                            templateObj={templateObj} 
                            setTemplateObj={setTemplateObj} 
                        />
                    )
                }}
            />
        </View>
    )
}

const NewTemplateForm = ({navigation}) => {
    const [templateObj, setTemplateObj] = useState({})
    const [exerciseList, setExerciseList] = useState([])
    //const newId = uuidv4()

    useEffect(() => {
        getData("exercises")
            .then((val) => setExerciseList(val))
        
        let newTemplateObj = JSON.parse(JSON.stringify(templateObj))

        console.log(templateObj.exercises)
        if (!templateObj.exercises) {
            newTemplateObj = {...newTemplateObj, exercises: []}
        }
        /* TODO: add react native uuid package 
        if (!templateObj.id) {
            newTemplateObj = {...newTemplateObj, id: newId}
        }
        */
        if (!templateObj.name) {
            newTemplateObj = {...newTemplateObj, name: ''}
        }
        setTemplateObj(newTemplateObj)
    }, [])

    useEffect(() => console.log("template updated:", templateObj), [templateObj])

    return (
        <View>
            <Text style={styles.title}>Template Name</Text>
            <TextInput
                placeholder="Set a template name"
                value={templateObj.name}
                onChangeText={(text) => setTemplateObj({...templateObj, name: text})}
             />

            <ExerciseList exerciseList={exerciseList} templateObj={templateObj} setTemplateObj={setTemplateObj} />

            <Text style={styles.title}>Added Exercises</Text>
            <FlatList
                data={templateObj.exercises}
                renderItem={({item}) => <Text style={styles.subtext}>{item}</Text>}
            />

            <Button 
                title="Save template"
                onPress={() => onSaveTemplate(templateObj, navigation)}
            />
        </View>
    )
}

export default NewTemplateForm