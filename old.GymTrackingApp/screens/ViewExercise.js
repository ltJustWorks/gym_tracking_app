import React, { useState, useEffect } from 'react'
import { View, Button, FlatList, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
import styles from '../styles/styles'
import LinearGradient from 'react-native-linear-gradient'
import AccordionItem from '../components/AccordionItem'

const ViewExercise = ({route, navigation}) => {
    const exerciseObj = route.params.exercise
    const [isExpanded, setIsExpanded] = useState(false)
    const [currBorderFade, setCurrBorderFade] = useState("#3e3e3e")

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
        setCurrBorderFade(!isExpanded ?  "rgba(242,242,242,255)" : "#9c9a9a")
    }
    
    return ( // TODO: possibly format instructions to make them easier to read
        <View style={{flex:1}}>
            <Text style={styles.itemtitle}>{exerciseObj.name}</Text>
            <AccordionItem 
                children={exerciseObj.instructions}
                title="Instructions"
            />

            {/*<FlatList 
                data={exerciseObj.images}
                renderItem={({item}) => {
                    const img_path = '../data/exercises/' + item
                    return (
                        <Image 
                            source={{uri: img_path}}
                        />
                }}
            />*/}

        </View>
    )
}

export default ViewExercise