import React, {Component} from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, ListItem, Button, FormInput, FormLabel} from 'react-native-elements'

import {TitlePointsDescription} from "../elements/TitlePointsDescription";
import {TitlePointsDescriptionPreview} from "../elements/TitlePointsDescriptionPreview";
import {PreviewButton} from '../elements/PreviewButton'
import {SaveCancelButtons} from '../elements/SaveCancelButtons'

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

  updateForm = (newState) => {
    this.setState(newState);
  }

  saveForm = () => {
    this.state.assignment.title = this.state.title;
    this.state.assignment.description = this.state.description;
    this.state.assignment.points = this.state.points;

      fetch('http://fast-ocean-68598.herokuapp.com/api/assignment/'+this.state.assignment.id,
        {
          method: 'put',
          body: JSON.stringify(this.state.assignment),
          headers: {
            'content-type': 'application/json'}
        }).then(() => this.props.navigation.goBack())
  }

  cancel = () => {
      this.props.navigation.goBack();
  }

    render() {


      if(this.state.preview) {
        return (
          <ScrollView>
            <View style={{padding: 15}}>
              <PreviewButton
                preview={this.state.preview}
                updateForm ={this.updateForm.bind(this)}/>

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

              <SaveCancelButtons
                save={this.saveForm.bind(this)}
                cancel={this.cancel.bind(this)}/>
            </View>
          </ScrollView>
        )
      } else {
        return (
          <ScrollView>
            <View style={{padding: 15}}>

              <PreviewButton
                preview={this.state.preview}
                updateForm={this.updateForm.bind(this)}/>


              <TitlePointsDescriptionPreview
                title={this.state.title}
                points={"" + this.state.points}
                description={this.state.description}
                updateForm={this.updateForm.bind(this)}/>
            </View>

            <SaveCancelButtons
              save={this.saveForm.bind(this)}
              cancel={this.cancel.bind(this)}/>
          </ScrollView>
        )
      }
    }
}

export default AssignmentWidget;