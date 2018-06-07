import React, {Component} from 'react'
import {View} from 'react-native'
import {Text} from 'react-native-elements'


export const TitlePointsDescription = ({title, points, description}) =>
  (
    <View>
      <View style={{flexDirection:"row"}}>
        <View style={{flex:3}}>
          <Text h2 style={{justifyContent: 'flex-start',}}>
            {title}
          </Text>
        </View>
        <View style={{flex:1}}>
          <Text h2 style={{justifyContent: 'flex-end',}}>
            {points}
          </Text>
        </View>
      </View>

      <Text>{description}</Text>
    </View>
  );