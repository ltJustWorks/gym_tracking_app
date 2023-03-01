import React, { useState, useEffect } from 'react'
import { View, Button, FlatList, Text } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
import styles from '../styles/styles'

const onDeleteTemplate = (exerciseList) => {
}

const Template = ({exerciseObj}) => {
    console.log("exerciseobj in template list screen:", exerciseObj)
    return (
        <View style={styles.template}>
            <FlatList
                data={exerciseObj.exercises}
                renderItem={({item}) => <Text style={styles.subtext}>{item}</Text>}
            />
            <Button
                title="Delete Template"
                onPress={(exerciseObj => onDeleteTemplate(exerciseObj))}
            />
        </View>
    )
}

const renderTemplate = (exerciseObj) => {
    console.log("passed:", exerciseObj)
    return (
        <Template
            exerciseObj={exerciseObj}
        />
    )
}

const NewTemplateButton = ({navigation}) => {
    return (
        <Button 
            title="Add template"
            onPress={() => navigation.navigate("NewTemplateForm")}
        />
    )
}

const ExerciseTemplateList = ({navigation}) => {
    const [templateList, setTemplateList] = useState([]) // list of template objs

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            getData("templates")
            .then((val) => {
                console.log("template list:", val)
                setTemplateList(val)
            })
        })
    }, [navigation])
    
    if (templateList.length === 0) {
        return (
            <View style={styles.dividerContainer}>
                <View>
                    <Text style={styles.title}>Exercise Templates</Text>
                    <Text style={styles.itemtitle}>No templates, add some to start</Text>
                </View>
                <NewTemplateButton navigation={navigation} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercise Templates</Text>

            <FlatList
                style={styles.templateList}
                data={templateList}
                renderItem={({item}) => renderTemplate(item)}
            />

            <NewTemplateButton navigation={navigation} />
        </View>
    )
}

export default ExerciseTemplateList