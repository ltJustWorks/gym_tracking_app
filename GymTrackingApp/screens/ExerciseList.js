import React from 'react'
import { View, FlatList, Text, Button } from 'react-native'

const ExerciseList = ({navigation}) => {
    return (
        <View>
            <Text>Exercises</Text>
            <FlatList
                data={
                    [
                        {key: "Bench Press"},
                        {key: "Squat"},
                        {key: "Deadlift"},
                    ]
                }
                renderItem={({item}) => <Text>{item.key}</Text>}
            />
            <Button
                title="Add New Exercise"
                onPress={navigation.navigate("NewExerciseForm")}
            />
        </View>
    )
}

export default ExerciseList