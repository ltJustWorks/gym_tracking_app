import React, { useState, useEffect } from "react"
import { View, FlatList, Text, Button } from "react-native"
import { getData, saveData } from "../storage/dataHelper"

// load templates
// select template button -> pass template to progress screen

const onSelectTemplate = (navigation, exercises) => {
    navigation.navigate("WorkoutProgress", {exercises: exercises})
}

const TemplateSelection = ({navigation, exercises}) => {
    return (
        <View>
            <FlatList
                data={exercises}
                renderItem={({item}) => <Text>{item}</Text>}
            />
            <Button 
                title="Select Template"
                onPress={() => onSelectTemplate(navigation, exercises)}
            />
        </View>
    )
}

const renderTemplate = (navigation, template) => {
    return (
        <TemplateSelection navigation={navigation} exercises={template} />
    )
}

const SelectTemplate = ({navigation}) => {
    const [templates, setTemplates] = useState([])

    useEffect(() => {
        getData("templates")
            .then((val) => setTemplates(val))
    }, [])
    
    return (
        <View>
            <FlatList
                data={templates}
                renderItem={({item}) => renderTemplate(navigation, item)}
            />
        </View>
    )
}

export default SelectTemplate