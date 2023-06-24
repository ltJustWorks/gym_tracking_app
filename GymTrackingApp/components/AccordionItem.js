import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const AccordionItem = ({ children, title, flatList=false }) => {
  const [ expanded, setExpanded ] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = flatList 
    ? <View><FlatList data={children} renderItem={({item}) => <Text style={{fontSize:18, padding:2}}>{item}</Text>}/></View>
    : <ScrollView style={{flex:1}}><Text style={{fontSize:18}}>{ children }</Text></ScrollView>

  return (
    <View style={{margin:10, padding:5, backgroundColor:"#eaeaea"}}>
      <TouchableOpacity 
        style={{flexDirection:"row", justifyContent:"space-between",
                backgroundColor:"#eaeaea"}} 
        onPress={ toggleItem }>
        <Text style={{fontSize: 21}}>{ title }</Text>
        <Icon name={ expanded ? 'chevron-up' : 'chevron-down' }
              size={20} color="#bbb"
        />
      </TouchableOpacity>
      { expanded && body }
    </View>
  );
}

export default AccordionItem