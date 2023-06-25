import { useIsFocused, useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { View, FlatList, TextInput, Button, Text, TouchableOpacity, Alert } from "react-native"
import { getData, saveData } from "../storage/dataHelper"
import { LineChart } from 'react-native-chart-kit'
import styles from "../styles/styles"
import AccordionItem from "../components/AccordionItem"

const ExerciseSearchAccordion = ({historyPairs}) => {
    const exercises = historyPairs.map(pair => pair[0])
    console.log("marker", exercises)
    return (
        <AccordionItem
            title="Exercises Used"
            children={exercises}
            flatList={true}
        />
    )
}

const renderHistoryDataItem = (props, navigation) => {
    const item = props.item
    const date = item[0]
    return (
        <TouchableOpacity
            onPress={navigation.navigate("View Workout Record")}
        >
            <Text style={{fontSize:18, padding:2}}>{formatISODateStr(date)}</Text>
        </TouchableOpacity>
    )
}

const HistoryAccordion = ({historyData}) => {
    return (
        <AccordionItem
            title="Workout Record"
            children={Object.entries(historyData)}
            flatList={true}
            renderItem={renderHistoryDataItem}
        />
    )
}

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
    const formattedDate = date.toLocaleString("en-US", { month: "long", day: "numeric" })
    return formattedDate
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
        <View style={{flex: 1, alignItems: "center", margin:4}}>
            <Text style={styles.subtext}>{exercise}</Text>
            <View style={{borderRadius:20, overflow:"hidden"}}>
            <LineChart
                title={exercise}
                data={historyData}
                width={350}
                height={220}
                yAxisSuffix=" lbs"
                chartConfig={{
                    backgroundColor: "#2196f3",
                    backgroundGradientFrom: '#1a78c2',
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
        </View>
    )
}

const onChangeSearch = (search, setVisibleSize, setVisiblePairs, historyPairs, setSearch) => {
    setSearch(search)
    setVisibleSize(5)
    console.log("marker", historyPairs)
    console.log("marker 2", historyPairs.filter(([exercise, _]) => exercise.toLowerCase().includes(search.toLowerCase())))
    if (search==="") {
        setVisiblePairs(historyPairs)
    }
    else {
        setVisiblePairs(historyPairs.filter(([exercise, _]) => exercise.toLowerCase().includes(search.toLowerCase())))
    }
}

const WorkoutHistory = ({navigation}) => {
    const [historyData, setHistoryData] = useState([])
    const [historyPairs, setHistoryPairs] = useState([]) // [[exercise_name, history_obj],...]
    const [visiblePairs, setVisiblePairs] = useState([])
    const [visibleSize, setVisibleSize] = useState(5)
    const [search, setSearch] = useState('')

    useEffect(() => {

        getData("workout_history")
            .then((val) => {
                const workout_history = val
                setHistoryData(workout_history)
                const exercises = exercisesInHistory(workout_history)
                const pairs = []

                for (let i=0; i<exercises.length; i++) {
                    const history_data = exerciseChartDataFromHistory(workout_history, exercises[i])
                    const cleaned_data = {...history_data, labels: formatLabels(history_data.labels)}
                    pairs.push([exercises[i], cleaned_data])
                }

                // assuming there are exercises in history
                setHistoryPairs(pairs)
                setVisiblePairs(pairs)
            })
            .then(() => console.log("marker", Object.keys(historyData)))
    }, [])

    if (!historyPairs) {
        return (
            <View>
                <Text style={styles.subtext}>Loading...</Text>
            </View>
        )
    }
    else if (historyPairs.length === 0) {
        return (
            <View>
                <Text style={styles.subtext}>No exercises found.</Text>
            </View>
        )
    }
    else {
        return (
            <View style={{flex:1}}>
                {/*<ExerciseSearchAccordion historyPairs={historyPairs} />*/}
                <HistoryAccordion historyData={historyData} />
                <TextInput 
                    style={styles.itemtitle}
                    value={search}
                    placeholder="Search"
                    onChangeText={(text) => onChangeSearch(text, setVisibleSize, setVisiblePairs, historyPairs, setSearch)}
                />
                <FlatList
                    data={visiblePairs}
                    renderItem={({item}) => {
                    return (
                        <View>
                            <HistoryChart exercise={item[0]} historyData={item[1]} />
                        </View>
                    )}}
                    ListEmptyComponent={() => 
                        {if (search) {return <Text style={styles.subtext}>No exercises found.</Text>}}
                    }
                />
                <TouchableOpacity>
                    <Text style={styles.subtext}>Load more</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default WorkoutHistory