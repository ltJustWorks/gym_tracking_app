import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { saveData, getData } from "../storage/dataHelper"
import styles from "../styles/styles"
import ExerciseList from "../components/ExerciseList"
const exercisesList = require('../data/exercises/exercises.json')

const ProgressAddExercise = ({route, navigation}) => {
    const [templateObj, setTemplateObj] = useState(route.params.templateObj)

    useEffect(() => {
        console.log("marker", route.params.templateObj)
    }, [])

    return (
        <View style={{flex:1}}>
            <ExerciseList exerciseList={exercisesList} templateObj={templateObj} />
        </View>
    )
}

export default ProgressAddExercise