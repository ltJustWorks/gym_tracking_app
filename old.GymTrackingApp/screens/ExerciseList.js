import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import styles from '../styles/styles'
const exercisesList = require('../data/exercises/exercises.json')

const ExerciseItem = ({exerciseObj, navigation}) => {
    // show exercise name and image, item is also pressable button to view more details about exercise
    return (
        <TouchableOpacity 
            style={styles.exerciseItemButton}
            onPress={() => navigation.navigate("View Exercise", {exercise: exerciseObj})}
        >
            <Text style={styles.subtext}>{exerciseObj.name}</Text>
        </TouchableOpacity>
    )
}

const renderExerciseItem = (item, navigation) => {
    return (
        <ExerciseItem 
            exerciseObj={item} 
            navigation={navigation}
        />
    )
}

const handleLoadMore = (visibleSize, setVisibleSize, filteredExerciseList, setVisibleExercises) => {
    setVisibleSize(visibleSize + 20)
    reload(visibleSize + 20, filteredExerciseList, setVisibleExercises)
}

const reload = (visibleSize, filteredExerciseList, setVisibleExercises) => {
    setVisibleExercises(filteredExerciseList.slice(0, visibleSize))
}

const onChangeSearch = (text, filteredExerciseList, setFilteredExerciseList, visibleSize, setVisibleSize, setVisibleExercises) => {
    setVisibleSize(20)
    const newFilteredList = exercisesList.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
    setFilteredExerciseList(newFilteredList)
    reload(visibleSize, newFilteredList, setVisibleExercises)
}

const ExerciseList = ({navigation}) => {
    const exerciseList = exercisesList
    const [filteredExerciseList, setFilteredExerciseList] = useState([])
    const [visibleExercises, setVisibleExercises] = useState([])
    const [visibleSize, setVisibleSize] = useState(20)

    if (exerciseList.length === 0) {
        return (
            <View style={styles.dividerContainer}>
                <View>
                    <Text style={styles.title}>Exercises</Text>
                    <Text style={styles.subtext}>Error loading exercises.</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercises</Text>
            <TextInput 
                style={styles.itemtitle}
                placeholder="Search"
                onChangeText={text => onChangeSearch(text, filteredExerciseList, setFilteredExerciseList, visibleSize, setVisibleSize, setVisibleExercises)}
            />
            <FlatList
                data={visibleExercises}
                renderItem={({item}) => renderExerciseItem(item, navigation)}
                ListEmptyComponent={() => <Text style={styles.subtext}>No exercises found.</Text>}
            />
            <TouchableOpacity onPress={() => handleLoadMore(visibleSize, setVisibleSize, filteredExerciseList, setVisibleExercises)}>
                <Text style={styles.subtext}>Load more</Text>
            </TouchableOpacity>

            
        </View>
    )
}

export default ExerciseList