import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const AccordionItem = ({ children, title, flatList=false }) => {
  const [ expanded, setExpanded ] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = flatlist 
    ? <ScrollView style={{flex:1}}><Text style={{fontSize:18}}>{ children }</Text></ScrollView>
    : <View style={{flex:1}}><FlatList data={children} renderItem={({item}) => <Text>{item}</Text>}/></View>

  return (
    <View style={{flex:1, margin:10}}>
      <TouchableOpacity 
        style={{flexDirection:"row", justifyContent:"space-between",
               padding:5, backgroundColor:"#eaeaea"}} 
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