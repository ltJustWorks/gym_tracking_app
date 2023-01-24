import React, { useEffect } from "react"
import { View, Button } from "react-native"
import { saveData, getData } from "../storage/dataHelper"

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
        })
}

const MainMenu = ({navigation}) => {
    useEffect(() => initData(), [])

    return <View>
        <Button
            title="Start a workout"
        />
        <Button
            title="Workout template list"
            onPress={() => navigation.navigate("ExerciseTemplateList")}
        />
        <Button
            title="Exercise list"
            onPress={() => navigation.navigate("ExerciseList")}
        />
    </View>
}

export default MainMenu