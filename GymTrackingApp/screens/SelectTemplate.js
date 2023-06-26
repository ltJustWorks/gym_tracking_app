import React, { useState, useEffect } from "react"
import { View, FlatList, Text, Button } from "react-native"
import { getData, saveData } from "../storage/dataHelper"
import styles from "../styles/styles"

// load templates
// select template button -> pass template to progress screen

const onSelectTemplate = (navigation, exercises) => {
    navigation.navigate("Workout Progress", {exercises: exercises})
}

const TemplateSelection = ({navigation, templateObj}) => {
    return (
        <View style={styles.template}>
            <Text style={styles.itemtitle}>{templateObj.name}</Text>
            <FlatList
                data={templateObj.exercises}
                renderItem={({item}) => <Text style={styles.subtext}>{item}</Text>}
            />
            <View style={{borderRadius:20, overflow:"hidden"}}>
            <Button 
                title="Select Template"
                onPress={() => onSelectTemplate(navigation, templateObj.exercises)}
            />
            </View>
        </View>
    )
}

const renderTemplate = (navigation, templateObj) => {
    return (
        <TemplateSelection navigation={navigation} templateObj={templateObj} />
    )
}

const SelectTemplate = ({navigation}) => {
    const [templates, setTemplates] = useState([])

    useEffect(() => {
        console.log("what", templates, templates === [])
        getData("templates")
            .then((val) => setTemplates(val))
    }, [])

    if (templates.length === 0) {
        return (
            <View>
                <Text style={styles.title}>Templates</Text>
                <Text style={styles.subtext}>No exercise templates found.</Text>
            </View>
        )
    }
   
    return (
        <View>
            <Text style={styles.title}>Templates</Text>
            <FlatList
                data={templates}
                renderItem={({item}) => renderTemplate(navigation, item)}
            />
        </View>
    )
}

export default SelectTemplate