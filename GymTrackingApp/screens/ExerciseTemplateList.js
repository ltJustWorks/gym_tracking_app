import React, { useState, useEffect } from 'react'
import { View, Button, FlatList, Text } from 'react-native'
import { getData } from '../storage/dataHelper'
import { useIsFocused } from '@react-navigation/native'
import styles from '../styles/styles'

const Template = ({exerciseList}) => {
    console.log("exerciselist in template list screen:", exerciseList)
    return (
        <FlatList
            data={exerciseList}
            renderItem={({item}) => <Text>{item}</Text>}
        />
    )
}

const renderTemplate = (exerciseList) => {
    console.log("passed:", exerciseList)
    return (
        <Template
            exerciseList={exerciseList}
        />
    )
}

const ExerciseTemplateList = ({navigation}) => {
    const isFocused = useIsFocused()

    const [templateList, setTemplateList] = useState([])

    useEffect(() => {
        getData("templates")
        .then((val) => {
            console.log("template list:", val)
            setTemplateList(val)
        })
    }, [isFocused])

    return (
        <View>
            <Text style={styles.title}>Exercise Templates</Text>

            <FlatList
                data={templateList}
                renderItem={({item}) => renderTemplate(item)}
            />

            <Button
                title="Add new template"
                onPress={() => navigation.navigate("NewTemplateForm")}
            />
        </View>
    )
}

export default ExerciseTemplateList