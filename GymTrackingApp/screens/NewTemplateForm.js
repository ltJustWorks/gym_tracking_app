import React, { useState, useEffect, useId } from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
//import { v4 as uuidv4 } from 'uuid'
import styles from '../styles/styles'
const exercisesList = require('../data/exercises/exercises.json')
import Icon from 'react-native-vector-icons/FontAwesome'
import ExerciseList from '../components/ExerciseList'
import AddedExercises from '../components/AddedExercises'

const onSaveTemplate = (templateObj, navigation) => {
    if (templateObj.name === "") {
        Alert.alert("Error", "Add a template name.")
        return
    }
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

            <View style={{flex: 1}}> 
            <AddedExercises templateObj={templateObj} setTemplateObj={setTemplateObj} />


            <View style={{borderRadius:20, overflow:"hidden", margin:4}}><Button 
                title="Save template"
                onPress={() => {
                    if (templateObj.exercises.length === 0) {
                        Alert.alert("Error", "Add some exercises before saving your template.")
                    }
                    else {
                        onSaveTemplate(templateObj, navigation)
                    }
                }}
            /></View>
            </View>
        </View>
    )
}

export default NewTemplateForm