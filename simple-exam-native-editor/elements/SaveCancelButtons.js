import React from 'react'
import {View} from 'react-native'
import {Button} from 'react-native-elements'

export const SaveCancelButtons = ({save, cancel}) => (
  <View style={{flexDirection:"row"}}>
    <View style={{flex:1}}>
      <Button	backgroundColor="green"
               color="white"
               title="Save"
               onPress={save}/>
    </View>
    <View style={{flex:1}}>
      <Button	backgroundColor="red"
               color="white"
               title="Cancel"
               onPress={cancel}/>
    </View>
  </View>
);