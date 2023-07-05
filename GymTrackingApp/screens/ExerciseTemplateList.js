import React, { useState, useEffect } from 'react'
import { View, Button, FlatList, Text, Alert } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
import styles from '../styles/styles'
import RoundButton from '../components/RoundButton'

const onDeleteTemplate = (templateObjToRemove, templateList, setTemplateList) => {
    console.log("old template list:", templateList)
    const newTemplateList = templateList.filter(templateObj => templateObj.name !== templateObjToRemove.name)
    console.log("new template list:", newTemplateList)
    saveData("templates", newTemplateList)
        .then(setTemplateList(newTemplateList))
}

const Template = ({templateObj, templateList, setTemplateList, navigation}) => {
    console.log("templateobj in template list screen:", templateObj)
    return (
        <View style={styles.template}>
            <Text style={styles.itemtitle}>{templateObj.name}</Text>
            <FlatList
                data={templateObj.exercises}
                renderItem={({item}) => <Text style={styles.subtext}>{item}</Text>}
            />
            <RoundButton
                title="Delete Template"
                onPress={(() => {
                    Alert.alert("Attention", "Are you sure you want to remove this template?", [
                        {text:"Yes", onPress: () => onDeleteTemplate(templateObj, templateList, setTemplateList)},
                        {text:"No", onPress: () => {}}
                    ])
                })}
            />
            <RoundButton 
                title="Edit Template"
                onPress={() => {navigation.navigate("Edit Template Form")}} 
            />
        </View>
    )
}

const renderTemplate = (templateObj, templateList, setTemplateList, navigation) => {
    console.log("passed:", templateObj)
    return (
        <Template
            templateObj={templateObj}
            templateList={templateList}
            setTemplateList={setTemplateList}
            navigation={navigation}
        />
    )
}

const NewTemplateButton = ({navigation}) => {
    return (
        <View style={{borderRadius:20, overflow:"hidden", margin:4}}>
        <Button 
            title="Add template"
            onPress={() => navigation.navigate("New Template Form")}
        />
        </View>
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
                renderItem={({item}) => renderTemplate(item, templateList, setTemplateList, navigation)}
            />

            <NewTemplateButton navigation={navigation} />
        </View>
    )
}

export default ExerciseTemplateList