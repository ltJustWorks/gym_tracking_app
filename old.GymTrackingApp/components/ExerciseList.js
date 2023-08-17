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
        <View style={{flex:1}}>
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

export default ExerciseList