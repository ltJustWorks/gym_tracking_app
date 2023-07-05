import React, { useState, useEffect, useId } from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native'
import { getData, saveData } from '../storage/dataHelper'
//import { v4 as uuidv4 } from 'uuid'
import styles from '../styles/styles'
const exercisesList = require('../data/exercises/exercises.json')
import Icon from 'react-native-vector-icons/FontAwesome'

const EditTemplateForm = ({route, navigation}) => {
    const {templateObj} = route.params

    return (
        <View>
            <Text>{templateObj ? "Yes" : "No"}</Text>
        </View>
    )
}

export default EditTemplateForm