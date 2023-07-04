import React, { useState, useEffect, useId } from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
import styles from '../styles/styles'
import Icon from 'react-native-vector-icons/FontAwesome'

const onRemoveExercise = (exercise_to_delete, templateObj, setTemplateObj) => {
    let newTemplateObj = {...templateObj, exercises: templateObj.exercises.filter(exercise => exercise !== exercise_to_delete)}
    setTemplateObj(newTemplateObj)
}

const AddedExercises = ({templateObj, setTemplateObj}) => {
    return (
            <View style={{flex:1}}>
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
            </View>
    )
}
 
export default AddedExercises