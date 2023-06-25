import { useIsFocused, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { View, FlatList, TextInput, Button, Text, TouchableOpacity, Alert } from "react-native"
import { getData, saveData } from "../storage/dataHelper"
import styles from "../styles/styles"
import AccordionItem from "../components/AccordionItem"

const Set = ({set}) => {
    return (
        <View>
            <Text>{set.weight} lbs</Text>
            <Text>{set.reps} reps</Text>
        </View>
    )
}

const Exercise = ({exercise_name, set_list}) => {
    console.log("marker", set_list)
    return (
        <View>
            <Text>{exercise_name}</Text>
            <FlatList
                data={set_list}
                renderItem={({item}) => <Set set={item}/>}
            />
        </View>
    )
}

const ViewWorkoutRecord = ({route, navigation}) => {
    const {date} = route.params
    const [record, setRecord] = useState({})

    useEffect(() => {
        getData('workout_history')
            .then((val) => {
                setRecord(val[date])
                console.log(val[date])
            })
    }, [])

    return (
        <View>
            <FlatList
                data={Object.keys(record)}
                renderItem={({item}) => <Exercise exercise_name={item} set_list={record[item]} />}
            />
        </View>
    )
}

export default ViewWorkoutRecord