import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const defaultRenderItem = ({item}) => <Text style={{fontSize:18, padding:2}}>{item}</Text>

const AccordionItem = ({ children, title, flatList=false, renderItem=defaultRenderItem}) => {
  const [ expanded, setExpanded ] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = flatList 
    ? <View><FlatList data={children} renderItem={renderItem}/></View>
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
      <View
        style={ expanded ? {
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        } : {}}
      />
      { expanded && body }
    </View>
  );
}

export default AccordionItem