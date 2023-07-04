import React, { useState, useEffect, useId } from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
import styles from '../styles/styles'
const exercisesList = require('../data/exercises/exercises.json')
import ExerciseList from '../components/ExerciseList'
import AddedExercises from '../components/AddedExercises'
import SaveTemplateButton from '../components/SaveTemplateButton'
import SetTemplateName from '../components/SetTemplateName'

const NewTemplateForm = ({navigation}) => {
    const [templateObj, setTemplateObj] = useState({})
    const [exerciseList, setExerciseList] = useState(exercisesList)
    //const newId = uuidv4()

    useEffect(() => {
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
        <View style={{flex:1, justifyContent:"space-between"}}>
            <SetTemplateName templateObj={templateObj} setTemplateObj={setTemplateObj} />

            <ExerciseList exerciseList={exerciseList} templateObj={templateObj} setTemplateObj={setTemplateObj} />

            <AddedExercises templateObj={templateObj} setTemplateObj={setTemplateObj} />
            <SaveTemplateButton templateObj={templateObj} navigation={navigation} />
        </View>
    )
}

export default NewTemplateForm