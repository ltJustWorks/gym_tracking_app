import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Button, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { getData } from '../storage/dataHelper'

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        exerciseContainer: {
            backgroundColor: "#eaeaea",
            margin: 10
        },
        title: {
            fontWeight: "bold",
            fontSize: 30,
            alignSelf: "center"
        },
        itemtitle: {
            fontSize: 25
        },
        subtext: {
            fontSize: 20 
        }
    }
)

const ExerciseItem = ({name, sets, reps, weight}) => {
    return (
        <View style={styles.exerciseContainer}>
            <Text style={styles.itemtitle}>{name}</Text>
            <Text style={styles.subtext}>{sets} sets</Text>
            <Text style={styles.subtext}>{reps} reps</Text>
            <Text style={styles.subtext}>{weight} lbs</Text>
        </View>
    )
}

const renderExerciseItem = ({item}) => {
    return (
        <ExerciseItem name={item.name} sets={item.sets} />
    )
}

const ExerciseList = ({navigation}) => {
    const isFocused = useIsFocused()
    const [exerciseList, setExerciseList] = useState([])

    useEffect(() => {
        getData("exercises").then((val) => {
            console.log("exercise list:", val)
            setExerciseList(val)
        })
    }, [isFocused])

    return (
        <View style={styles.container}>
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