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
    const [templateList, setTemplateList] = useState([])

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            getData("templates")
            .then((val) => {
                console.log("template list:", val)
                setTemplateList(val)
            })
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercise Templates</Text>

            <FlatList
                style={styles.templateList}
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