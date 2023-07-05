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

const onSaveTemplate = () => {}

const EditTemplateForm = ({route, navigation}) => {
    const {templateObj} = route.params
    const [templateEditObj, setTemplateEditObj] = useState(templateObj)

    return (
        <View style={{flex:1, justifyContent:"space-between"}}>
            <SetTemplateName templateObj={templateEditObj} setTemplateObj={setTemplateEditObj} />

            <ExerciseList exerciseList={exerciseList} templateObj={templateObj} setTemplateObj={setTemplateEditObj} />

            <AddedExercises templateObj={templateEditObj} setTemplateObj={setTemplateEditObj} />
            <SaveTemplateButton templateObj={templateEditObj} 
                navigation={navigation} onSaveTemplate={onSaveTemplate}/>
        </View>
    )
}

export default EditTemplateForm