import React, { useState, useEffect } from 'react'
import { View, Button, FlatList, Text } from 'react-native'
import { getData } from '../storage/dataHelper'
import { useIsFocused } from '@react-navigation/native'
import styles from '../styles/styles'

const TemplateItem = ({name}) => {
    return (
        <View>
        </View>
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
                /*renderItem={({item}) => {
                    <TemplateItem
                        name={item.name}
                    />
                }}
                */
            />

            <Button
                title="Add new template"
                onPress={() => navigation.navigate("NewTemplateForm")}
            />
        </View>
    )
}

export default ExerciseTemplateList