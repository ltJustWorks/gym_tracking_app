import { useIsFocused, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { View, FlatList, TextInput, Button, Text, Alert } from "react-native"
import { getData, saveData } from "../storage/dataHelper"
import { LineChart } from 'react-native-chart-kit'
import styles from "../styles/styles"

const exerciseChartDataFromHistory = (history, exercise) => {
    let chartData = {
        labels: [],
        datasets: [
            {
                data: [],
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                strokeWidth: 2
            }
        ]
    }
    
    for (let date of Object.keys(history)) {
        let weights = []
        if (!history[date][exercise]) {console.log("here 2")} // skip if date does not have the exercise
        else {
            for (let set of history[date][exercise]) {
                weights.push(set["weight"])
            }
            chartData["labels"].push(date)
            const avg_weight = weights.reduce((a,b) => a+b) / weights.length
            chartData["datasets"][0]["data"].push(avg_weight)
        }
    }

    return chartData
}

const exercisesInHistory = (history) => {
    const exercises = []
    for (let date of Object.keys(history)) {
        for (let exercise of Object.keys(history[date])) {
            if (!(exercises.includes(exercise))) {
                exercises.push(exercise)
            }
        }
    }
    return exercises
}

const formatISODateStr = (ISODateStr) => {
    const date = new Date(ISODateStr)
    const options = {month: '2-digit', day: '2-digit'}
    return date.toLocaleDateString('en-US', options)
}

const formatLabels = (labels) => {
    let new_labels = []
    for (let label of labels) {
        new_labels.push(formatISODateStr(label))
    }
    return new_labels
}

const HistoryChart = ({exercise, historyData}) => {
    return (
        <View style={{flex: 1, alignItems: "center"}}>
            <Text style={styles.subtext}>{exercise}</Text>
            <LineChart
                data={historyData}
                width={350}
                height={220}
                yAxisSuffix=" lbs"
                chartConfig={{
                    backgroundColor: "#2196f3",
                    backgroundGradientFrom: '#2196f3',
                    backgroundGradientTo: '#2196f3',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726'
                    }
                }}
            />
        </View>
    )
}

const WorkoutHistory = () => {
    const [historyPairs, setHistoryPairs] = useState([]) // [[exercise_name, history_obj],...]

    useEffect(() => {

        getData("workout_history")
            .then((val) => {
                const workout_history = val
                console.log("marker", workout_history)
                const exercises = exercisesInHistory(workout_history)
                const pairs = []

                for (let i=0; i<exercises.length; i++) {
                    const history_data = exerciseChartDataFromHistory(workout_history, exercises[i])
                    const cleaned_data = {...history_data, labels: formatLabels(history_data.labels)}
                    pairs.push([exercises[i], cleaned_data])
                }

                // assuming there are exercises in history
                setHistoryPairs(pairs)
            })
    }, [])
    
    if (!historyPairs || historyPairs.length === 0) {
        return (
            <View>
                <Text style={styles.subtext}>Loading...</Text>
            </View>
        )
    }
    else {
        return (
            <View>
                <FlatList
                    data={historyPairs}
                    renderItem={({item}) => {
                    return (
                        <View>
                            <HistoryChart exercise={item[0]} historyData={item[1]} />
                        </View>
                    )
                }}
                />
            </View>
        )
    }
}

export default WorkoutHistory