import React from 'react'
import { View, Button } from 'react-native'

const RoundButton = ({title, onPress}) => {
    return (
        <View style={{borderRadius:20, overflow:"hidden", margin:4}}>
            <Button
                title={title}
                onPress={onPress}
            />
        </View>
    )
}

export default RoundButton