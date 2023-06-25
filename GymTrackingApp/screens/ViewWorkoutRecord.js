import { useIsFocused, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { View, FlatList, TextInput, Button, Text, TouchableOpacity, Alert } from "react-native"
import { getData, saveData } from "../storage/dataHelper"
import styles from "../styles/styles"
import AccordionItem from "../components/AccordionItem"

const ViewWorkoutRecord = ({route, navigation}) => {
    const {date} = route.params
    const [record, setRecord] = useState({})

    useEffect(() => {
        getData('workout_history')
            .then((val) => {
                setRecord(val[date])
                console.log(Object.entries(val[date]))
            })
    }, [])

    return (
        <View>
            <Text>test</Text>
        </View>
    )
}

export default ViewWorkoutRecord