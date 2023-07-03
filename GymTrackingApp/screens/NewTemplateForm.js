import React, { useState, useEffect, useId } from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
//import { v4 as uuidv4 } from 'uuid'
import styles from '../styles/styles'
const exercisesList = require('../data/exercises/exercises.json')
import Icon from 'react-native-vector-icons/FontAwesome'
import ExerciseList from '../components/ExerciseList'
import AddedExercises from '../components/AddedExercises'
import SaveTemplateButton from '../components/SaveTemplateButton'

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
        <View style={{flex:1}}>
            <View>
            <Text style={styles.title}>Template Name</Text>
            <TextInput
                placeholder="Set a template name"
                value={templateObj.name}
                onChangeText={(text) => setTemplateObj({...templateObj, name: text})}
                style={styles.subtext}
             />
             </View>

            <ExerciseList exerciseList={exerciseList} templateObj={templateObj} setTemplateObj={setTemplateObj} />

            <View style={{flex: 1, justifyContent:"space-between"}}> 
            <AddedExercises templateObj={templateObj} setTemplateObj={setTemplateObj} />
            <SaveTemplateButton templateObj={templateObj} navigation={navigation} />
            </View>
        </View>
    )
}

export default NewTemplateForm