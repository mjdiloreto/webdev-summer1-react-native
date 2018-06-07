import React, {Component} from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, ListItem, Button, FormInput, FormLabel} from 'react-native-elements'

import {TitlePointsDescription} from "../elements/TitlePointsDescription";
import {TitlePointsDescriptionPreview} from "../elements/TitlePointsDescriptionPreview";

class AssignmentWidget extends Component {
    static navigationOptions = {title: 'Assignment Editor'}

    constructor(props) {
        super(props);
        this.state = {
          assignment: props.navigation.getParam("assignment"),
          lessonId: props.navigation.getParam("lessonId"),
          preview: false,
          title:  props.navigation.getParam("assignment").title,
          points:  props.navigation.getParam("assignment").points,
          description:  props.navigation.getParam("assignment").description,
        }

        this.updateForm = this.updateForm.bind(this);
    }

  updateForm(newState) {
    this.setState(newState);
  }

  saveForm() {
      let newAssignment = this.state.assignment;
      newAssignment.title = this.state.title;
      newAssignment.description = this.state.description;
      newAssignment.points = this.state.points;

      fetch('http://fast-ocean-68598.herokuapp.com/api/lesson/'+this.state.lessonId+'assignment',
        {
          method: 'put',
          body: JSON.stringify(newAssignment),
          headers: {
            'content-type': 'application/json'}
        }).then(() => this.props.navigation.goBack())
  }

    render() {
      const prevButton = () => (
        <Button title="Preview"
                onPress={
                  () => {
                    this.updateForm({preview: !this.state.preview})
                  }
                }/>
      )

      const saveCancelButton = () => (
        <View style={{flexDirection:"row"}}>
          <View style={{flex:1}}>
            <Button	backgroundColor="green"
                     color="white"
                     title="Save"
                     onPress={this.saveForm}/>
          </View>
          <View style={{flex:1}}>
            <Button	backgroundColor="red"
                     color="white"
                     title="Cancel"/>
          </View>
        </View>
      )

      if(this.state.preview) {
        return (
          <ScrollView>
            {prevButton()}

            <TitlePointsDescription
              title={this.state.title}
              points={this.state.points}
              description={this.state.description}/>

            <FormLabel>Essay Answer</FormLabel>
            <TextInput style={{padding: 15}}
                       multiline={true}
                       numberOfLines={4}/>

            <FormLabel>Upload a file</FormLabel>
            <Button title="Choose File"/>

            <FormLabel>Submit a link</FormLabel>
            <FormInput/>

            {saveCancelButton()}
          </ScrollView>
        )
      } else {
        return (
          <ScrollView>
            <View style={{padding: 15}}>

              {prevButton()}

              <TitlePointsDescriptionPreview
                title={this.state.title}
                points={this.state.points}
                description={this.state.description}
                updateForm={this.updateForm.bind(this)}/>
            </View>

            {saveCancelButton()}
          </ScrollView>
        )
      }
    }
}

export default AssignmentWidget;