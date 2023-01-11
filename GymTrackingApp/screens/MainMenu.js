import React, { useEffect } from "react"
import { View, Button } from "react-native"
import { saveData, getData } from "../storage/dataHelper"

const initData = () => {
    getData("exercises")
        .then((val) => {
            console.log("initial data:", val)
            if (val !== []) {
                saveData("exercises", [])
            }
        }
    )
}

const MainMenu = ({navigation}) => {
    useEffect(() => initData(), [])

    return <View>
        <Button
            title="Start a workout"
        />
        <Button
            title="Workout template list"
        />
        <Button
            title="Exercise list"
            onPress={() => navigation.navigate("ExerciseList")}
        />
    </View>
}

export default MainMenu