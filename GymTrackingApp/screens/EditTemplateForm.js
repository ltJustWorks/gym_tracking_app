import React, { useState, useEffect, useId } from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
//import { v4 as uuidv4 } from 'uuid'
import styles from '../styles/styles'
const exerciseList = require('../data/exercises/exercises.json')
import Icon from 'react-native-vector-icons/FontAwesome'
import ExerciseList from '../components/ExerciseList'
import AddedExercises from '../components/AddedExercises'
import SaveTemplateButton from '../components/SaveTemplateButton'
import SetTemplateName from '../components/SetTemplateName'

const onSaveTemplate = (templateObj, navigation) => {
    if (templateObj.name === "") {
        Alert.alert("Error", "Add a template name.")
        return
    }
    getData("templates")
        .then((templatesList) => {
            for (let template of templatesList) {
                if (template.name === templateObj.oldName) {
                    console.log("list before:", templatesList)
                    console.log("match found")
                    return templatesList.map((template) => {
                        if (template.name === templateObj.oldName) {
                            return templateObj
                        }
                        else {return template}
                    })
                }
            }
        })
        .then((newTemplateObj) => {
            saveData("templates", newTemplateObj)
            .then(() => navigation.navigate("Exercise Template List"))
        })
}

const EditTemplateForm = ({route, navigation}) => {
    const {importObj} = route.params
    importObj.oldName = importObj.name // not really a good solution?
    // TODO: change to use uuids instead
    const [templateObj, setTemplateObj] = useState(importObj)

    return (
        <View style={{flex:1, justifyContent:"space-between"}}>
            <SetTemplateName templateObj={templateObj} setTemplateObj={setTemplateObj} />

            <ExerciseList exerciseList={exerciseList} templateObj={templateObj} setTemplateObj={setTemplateObj} />

            <AddedExercises templateObj={templateObj} setTemplateObj={setTemplateObj} />
            <SaveTemplateButton templateObj={templateObj} 
                navigation={navigation} onSaveTemplate={onSaveTemplate}/>
        </View>
    )
}

export default EditTemplateForm