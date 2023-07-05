import React, { useState, useEffect, useId } from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
//import { v4 as uuidv4 } from 'uuid'
import styles from '../styles/styles'
const exercisesList = require('../data/exercises/exercises.json')

const SaveTemplateButton = ({templateObj, navigation, onSaveTemplate}) => {
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