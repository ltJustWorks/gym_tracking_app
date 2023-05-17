import React, { useState, useEffect, useId } from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
//import { v4 as uuidv4 } from 'uuid'
import styles from '../styles/styles'
const exercisesList = require('../data/exercises/exercises.json')
import Icon from 'react-native-vector-icons/FontAwesome'

const addExercise = (newExerciseName, templateObj, setTemplateObj) => {
    let newTemplateObj = JSON.parse(JSON.stringify(templateObj)) // TODO: find a better way to deep copy (or avoid altogether)
    if (templateObj["exercises"].includes(newExerciseName)) {
        Alert.alert('Error', 'You can only add an exercise once.')
        return;
    }
    newTemplateObj.exercises = [...newTemplateObj.exercises, newExerciseName] // TODO: implement exercise with ids instead
    setTemplateObj(newTemplateObj)
}

const ExerciseSelection = ({item, templateObj, setTemplateObj}) => {
    const {name} = item
    return (
        <View style={{flex: 1, flexDirection: "row", alignItems:"center", padding:4}}>
            <Text style={{flex:1, flexWrap: 'wrap', fontSize: 20}}>{name}</Text>
            <View style={{borderWidth:0, borderRadius:10, overflow:"hidden"}}>
            <Button 
                title="Add exercise"
                onPress={() => {addExercise(name, templateObj, setTemplateObj)}}
            />
            </View>
        </View>
    )
}

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

const reload = (setVisibleList, filteredList, visibleSize) => {
    setVisibleList(filteredList.slice(0, visibleSize))
}

const handleSearch = (text, setFilteredList, setVisibleList, setVisibleSize) => {
    setVisibleSize(5)
    const newFilteredList = exercisesList.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
    setFilteredList(newFilteredList)
    reload(setVisibleList, newFilteredList, 5)
}

const handleViewMore = (visibleSize, setVisibleSize, setVisibleList, filteredList) => {
    setVisibleSize(visibleSize + 5)
    reload(setVisibleList, filteredList, visibleSize + 5)
}

const ExerciseList = ({exerciseList, templateObj, setTemplateObj}) => {
    const [visibleSize, setVisibleSize] = useState(5)
    const [visibleList, setVisibleList] = useState([])
    const [filteredList, setFilteredList] = useState([])

    return (
        <View style={{maxHeight: "45%"}}>
            <Text style={styles.title}>Exercise List</Text>

            <TextInput 
                placeholder="Search"
                style={[styles.subtext, {backgroundColor:"#eaeaea", borderRadius:20}]}
                onChangeText={(text) => handleSearch(text, setFilteredList, setVisibleList, setVisibleSize)}
            />

            {// TODO: Add fading edge to list
            }
            <FlatList 
                data = {visibleList}
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
            
            <TouchableOpacity onPress={() => handleViewMore(visibleSize, setVisibleSize, setVisibleList, filteredList)}>
                <Text style={styles.subtext2}>Load more</Text>
            </TouchableOpacity>

        </View>
    )
}

const onRemoveExercise = (exercise_to_delete, templateObj, setTemplateObj) => {
    let newTemplateObj = {...templateObj, exercises: templateObj.exercises.filter(exercise => exercise !== exercise_to_delete)}
    setTemplateObj(newTemplateObj)
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
            <Text style={styles.title}>Added Exercises</Text>
            <FlatList
                data={templateObj.exercises}
                renderItem={({item}) => {
                    return (
                        <View style={{flex:1, flexDirection:"row", alignItems:"center"}}>
                        <Text style={{flex:1, fontSize: 20, padding:5, flexWrap:"wrap"}}>{item}</Text>
                        <TouchableOpacity 
                            style={{padding:10}}
                            onPress={() => onRemoveExercise(item, templateObj, setTemplateObj)}
                        >
                            <Icon name='close'
                                size={20} color="#fc0303"
                            />
                        </TouchableOpacity>
                        </View>
                    )
                }}
                ListEmptyComponent={() => <Text style={styles.subtext}>No exercises added.</Text>}
            />

            <View style={{borderRadius:20, overflow:"hidden", margin:4}}><Button 
                title="Save template"
                onPress={() => {
                    if (templateObj.exercises.length === 0) {
                        Alert.alert("Error", "Add some exercises before saving your template.")
                    }
                    onSaveTemplate(templateObj, navigation)
                }}
            /></View>
            </View>
        </View>
    )
}

export default NewTemplateForm