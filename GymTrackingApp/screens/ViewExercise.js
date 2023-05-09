import React, { useState, useEffect } from 'react'
import { View, Button, FlatList, Text, Image } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
import styles from '../styles/styles'
import LinearGradient from 'react-native-linear-gradient'

const ViewExercise = ({route, navigation}) => {
    const exerciseObj = route.params.exercise
    const [isExpanded, setIsExpanded] = useState(false)
    const [currBorderFade, setCurrBorderFade] = useState("#3e3e3e")

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
        setCurrBorderFade(!isExpanded ?  "rgba(242,242,242,255)" : "#9c9a9a")
    }
    
    return ( // TODO: possibly format instructions to make them easier to read
        <View>
            <Text style={styles.itemtitle}>{exerciseObj.name}</Text>
            <Text style={styles.subtext}>Instructions</Text>
            <LinearGradient colors={["rgba(242,242,242,255)", "rgba(242,242,242,255)", currBorderFade]}>
                <Text 
                    style={{fontSize: 18, height: isExpanded ? 'auto' : 100, overflow: 'hidden'}}
                    onPress={() => toggleExpanded()}
                >
                    {exerciseObj.instructions}
                </Text>
            </LinearGradient>

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