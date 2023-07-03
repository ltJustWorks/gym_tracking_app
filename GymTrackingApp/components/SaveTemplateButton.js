import React, { useState, useEffect, useId } from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
//import { v4 as uuidv4 } from 'uuid'
import styles from '../styles/styles'
const exercisesList = require('../data/exercises/exercises.json')

const onSaveTemplate = (templateObj, navigation) => {
    if (templateObj.name === "") {
        Alert.alert("Error", "Add a template name.")
        return
    }
    getData("templates")
        .then((templatesList) => {
            // check and alert if another template has same name
            //for (const template of templatesList) {
            //}
            return [...templatesList, templateObj]
        })
        .then((newTemplatesList) => {
            //console.log("new templates list:", newTemplatesList)
            saveData("templates", newTemplatesList)
        })
        .then(() => navigation.navigate("Exercise Template List"))

}

const SaveTemplateButton = ({templateObj, navigation}) => {
    return (
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
    )
}

export default SaveTemplateButton