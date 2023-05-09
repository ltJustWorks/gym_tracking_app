import React, { useState, useEffect } from 'react'
import { View, Button, FlatList, Text, Image } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
import styles from '../styles/styles'

const ViewExercise = ({route, navigation}) => {
    const exerciseObj = route.params.exercise
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }
    
    return (
        <View>
            <Text style={styles.itemtitle}>{exerciseObj.name}</Text>
            <Text style={styles.subtext}>Instructions</Text>
            <Text 
                style={{fontSize: 18, height: isExpanded ? 'auto': 100, overflow: 'hidden'}}
                onPress={() => toggleExpanded()}
            >
                {exerciseObj.instructions}
            </Text>


            {/*<FlatList 
                data={exerciseObj.images}
                renderItem={({item}) => {
                    const img_path = '../data/exercises/' + item
                    return (
                        <Image 
                            source={{uri: img_path}}
                        />
                    )
                }}
            />*/}

        </View>
    )
}

export default ViewExercise