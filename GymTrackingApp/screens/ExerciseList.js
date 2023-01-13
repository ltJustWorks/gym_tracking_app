import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Button, StyleSheet } from 'react-native'
import { getData } from '../storage/dataHelper'

const styles = StyleSheet.create(
    {
        container: {

        },
        title: {
            fontWeight: "bold",
            height: 20,
            alignSelf: "center",
        }
    }
)

const renderExerciseItem = ({item}) => {
    return (
        <Text>{item.name}</Text>
    )
}

const ExerciseList = ({navigation}) => {
    const [exerciseList, setExerciseList] = useState([])

    useEffect(() => {
        getData("exercises").then((val) => {
            console.log("exercise list:", val)
            setExerciseList(val)
        })
    })

    return (
        <View>
            <Text style={styles.title}>Exercises</Text>
            <FlatList
                data={exerciseList}
                renderItem={renderExerciseItem}
            />
            <Button
                title="Add New Exercise"
                onPress={() => {navigation.navigate("NewExerciseForm")}}
            />
        </View>
    )
}

export default ExerciseList