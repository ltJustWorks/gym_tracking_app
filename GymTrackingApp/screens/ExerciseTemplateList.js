import React, { useState, useEffect } from 'react'
import { View, Button, FlatList, Text } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
import styles from '../styles/styles'

const onDeleteTemplate = (templateObjToRemove, templateList, setTemplateList) => {
    console.log("old template list:", templateList)
    const newTemplateList = templateList.filter(templateObj => templateObj.name !== templateObjToRemove.name)
    console.log("new template list:", newTemplateList)
    saveData("templates", newTemplateList)
        .then(setTemplateList(newTemplateList))
}

const Template = ({templateObj, templateList, setTemplateList}) => {
    console.log("templateobj in template list screen:", templateObj)
    return (
        <View style={styles.template}>
            <Text style={styles.itemtitle}>{templateObj.name}</Text>
            <FlatList
                data={templateObj.exercises}
                renderItem={({item}) => <Text style={styles.subtext}>{item}</Text>}
            />
            <Button
                title="Delete Template"
                onPress={(() => onDeleteTemplate(templateObj, templateList, setTemplateList))}
            />
        </View>
    )
}

const renderTemplate = (templateObj, templateList, setTemplateList) => {
    console.log("passed:", templateObj)
    return (
        <Template
            templateObj={templateObj}
            templateList={templateList}
            setTemplateList={setTemplateList}
        />
    )
}

const NewTemplateButton = ({navigation}) => {
    return (
        <Button 
            title="Add template"
            onPress={() => navigation.navigate("New Template Form")}
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
                    <Text style={styles.subtext}>No templates, add some to start</Text>
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
                renderItem={({item}) => renderTemplate(item, templateList, setTemplateList)}
            />

            <NewTemplateButton navigation={navigation} />
        </View>
    )
}

export default ExerciseTemplateList