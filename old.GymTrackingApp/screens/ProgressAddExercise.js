import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { saveData, getData } from "../storage/dataHelper"
import styles from "../styles/styles"
import ExerciseList from "../components/ExerciseList"
import RoundButton from "../components/RoundButton"
import AddedExercises from "../components/AddedExercises"
const exercisesList = require('../data/exercises/exercises.json')

const workoutToTemplateObj = (workoutObj) => {
    return {"exercises": Object.keys(workoutObj), "name": "temp"}
}

const mergeExercisesToWorkoutObj = (templateObj, workoutObj) => {
    const newExercises = templateObj.exercises 
}

const ProgressAddExercise = ({route, navigation}) => {
    const {workoutObj} = route.params
    const [templateObj, setTemplateObj] = useState({})

    useEffect(() => {
        setTemplateObj(workoutToTemplateObj(workoutObj))
    }, [])

    useEffect(() => console.log(templateObj), [templateObj])

    return (
        <View style={{flex:1}}>
            <ExerciseList exerciseList={exercisesList} templateObj={templateObj} setTemplateObj={setTemplateObj}/>
            <AddedExercises templateObj={templateObj} setTemplateObj={setTemplateObj} />
            <RoundButton title="Finish adding exercises" onPress={() => {navigation.navigate(
                "Workout Progress",
                //{workoutObj: mergeExercisesToWorkoutObj(templateObj, workoutObj)}
                {exercises: templateObj.exercises, workoutObj: workoutObj}
            )}} 
            />
        </View>
    )
}

export default ProgressAddExercise