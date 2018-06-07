import React, {Component} from 'react'
import {View, TextInput} from 'react-native'
import {FormInput, FormLabel} from 'react-native-elements'

export const TitlePointsDescriptionPreview = ({title, points, description, updateForm}) =>
  (
    <View>
      <FormLabel>Title</FormLabel>
      <FormInput
        value={title}
        onChangeText={text => updateForm({title: text})
        }/>

      <FormLabel>Points</FormLabel>
      <FormInput
        value={points}
        onChangeText={text => updateForm({points: text})
        }/>

      <FormLabel>Description</FormLabel>
      <TextInput
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={text => updateForm({description: text})
        }/>
    </View>
  )