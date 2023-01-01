import React from "react"
import { View, Button } from "react-native"

const MainMenu = ({navigation}) => {
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