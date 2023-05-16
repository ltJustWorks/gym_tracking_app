import React, { useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { saveData, getData } from "../storage/dataHelper"
import styles from "../styles/styles"

const initData = () => {
    getData("exercises")
        .then((val) => {
            console.log("initial data:", val)
            if (!(Array.isArray(val))) {
                saveData("exercises", [])
            }
        }
    )
    
    getData("templates")
        .then((val) => {
            console.log("initial template data:", val)
            if (!(Array.isArray(val)) || (val.includes(null))) {
                saveData("templates", [])
                console.log("template data initialized")
            }
        }
    )

    getData("workout_history")
        .then((val) => {
            if (!val) {
                saveData("workout_history", {})
                console.log("workout history data initialized")
            }
        })
    
}

const MainMenu = ({navigation}) => {
    useEffect(() => initData(), [])

    return <View style={styles.mainMenu}>
        <TouchableOpacity
            style={styles.mainMenuButton}
            onPress={() => navigation.navigate("Select Template")}
        >
            <Text style={[styles.title, {color: "white"}]}>Start a Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.mainMenuButton}
            onPress={() => navigation.navigate("Exercise Template List")}
        >
            <Text style={[styles.title, {color: "white"}]}>Workout Template List</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.mainMenuButton}
            onPress={() => navigation.navigate("Exercise List")}
        >
            <Text style={[styles.title, {color: "white"}]}>Exercise List</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.mainMenuButton}
            onPress={() => navigation.navigate("Workout History")}
        >
            <Text style={[styles.title, {color: "white"}]}>Workout History</Text>
        </TouchableOpacity>
    </View>
}

export default MainMenu