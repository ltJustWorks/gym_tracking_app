import React from 'react'
import { View, Text, TextInput } from 'react-native'
import styles from '../styles/styles'

const SetTemplateName = ({templateObj, setTemplateObj}) => {
    return (
        <View>
            <Text style={styles.title}>Template Name</Text>
            <TextInput
                placeholder="Set a template name"
                value={templateObj.name}
                onChangeText={(text) => setTemplateObj({...templateObj, name: text})}
                style={styles.subtext}
             />
        </View>
    )
}

export default SetTemplateName