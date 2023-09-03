import { useIsFocused, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { View, FlatList, TextInput, Button, Text, TouchableOpacity, Alert } from "react-native"
import { getData, saveData } from "../storage/dataHelper"
import styles from "../styles/styles"
import AccordionItem from "../components/AccordionItem"
import { formatISODateStr } from "../helpers/helpers"

const Set = ({set}) => {
    return (
        <View style={styles.setRow}>
            <Text style={[styles.subtext2, {padding:5}]}>{set.weight} lbs</Text>
            <Text style={[styles.subtext2, {padding:5}]}>{set.reps} reps</Text>
        </View>
    )
}

const Exercise = ({exercise_name, set_list}) => {
    return (
        <View style={{backgroundColor:"#eaeaea", padding:2, margin:4, borderRadius:20}}>
            <Text style={styles.subtext}>{exercise_name}</Text>
            <FlatList
                data={set_list}
                renderItem={({item}) => <Set set={item}/>}
            />
        </View>
    )
}

const deleteRecord = (date, navigation) => {
    getData("workout_history")
        .then((val) => {
            let new_workout_history = val
            delete new_workout_history[date]
            return new_workout_history
        })
        .then((new_workout_history) => {
            saveData("workout_history", new_workout_history)
            navigation.navigate("Workout History")
        })
}

const onDeleteRecord = (date, navigation) => {
    Alert.alert("Attention", "Are you sure you want to delete this record?", [
        {text:"Yes", onPress:() => {deleteRecord(date, navigation)}},
        {text:"No", onPress:() => {}}
    ])
}

const ViewWorkoutRecord = ({route, navigation}) => {
    const {date} = route.params
    const [record, setRecord] = useState({})

    useEffect(() => {
        getData('workout_history')
            .then((val) => {
                if (val[date]) {
                    setRecord(val[date])
                }
            })
    }, [])

    if (record === {}) {
        return (
            <View>
                <Text style={styles.subtext}>The entry was not found or has been deleted.</Text>
            </View>
        )
    }

    return (
        <View style={{flex:1, padding:4, justifyContent:"space-between"}}>
            <Text style={styles.itemtitle}>{formatISODateStr(date)}</Text>
            <FlatList
                data={Object.keys(record)}
                renderItem={({item}) => <Exercise exercise_name={item} set_list={record[item]} />}
            />
            <View style={{borderRadius:20, overflow:"hidden"}}>
                <Button
                    title="Delete Record"
                    onPress={() => onDeleteRecord(date, navigation)}
                />
            </View>
        </View>
    )
}

export default ViewWorkoutRecord