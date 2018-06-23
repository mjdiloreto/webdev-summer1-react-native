import React from 'react'
import {View, Picker, TextInput} from 'react-native'
import {FormLabel, FormInput, Text} from 'react-native-elements'
import {TitlePointsDescription} from "./TitlePointsDescription";
import {PreviewButton} from "./PreviewButton";
import {TitlePointsDescriptionPreview} from "./TitlePointsDescriptionPreview";
import {SaveCancelButtons} from "./SaveCancelButtons";
import OptionButtonGroup from "./OptionButtonGroup";

export default class FillInTheBlankQuestionEditor extends React.Component {
  static navigationOptions = { title: "Fill in the Blank"}

  constructor(props) {
    super(props);

    let question = this.props.navigation.getParam("question");
    this.state = {
      question: question,
      exam: this.props.navigation.getParam("exam"),
      title: question.title,
      description: question.description,
      points: question.points,
      variables: question.variables,
      preview: false
    }
  }

  updateForm(newState) {
    this.setState(newState);
  }

  save = () => {
    this.state.question.title = this.state.title;
    this.state.question.description = this.state.description;
    this.state.question.points = this.state.points;
    this.state.question.variables = this.state.variables

    fetch('http://fast-ocean-68598.herokuapp.com/api/blanks/'+this.state.question.id,
      {
        method: 'put',
        body: JSON.stringify(this.state.question),
        headers: {
          'content-type': 'application/json'}
      }).then(() => this.props.navigation.goBack())
  }

  cancel = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <PreviewButton
          updateForm={this.updateForm.bind(this)}
          preview={this.state.preview}/>

        {this.state.preview &&
          <View>
            <TitlePointsDescription
              title={this.state.title}
              points={this.state.points}
              description={this.state.description}/>

            <Text>{this.state.variables}</Text>
          </View>}

        {!this.state.preview &&
          <View>
            <TitlePointsDescriptionPreview
              title={this.state.title}
              points={this.state.points}
              description={this.state.description}
              updateForm={this.updateForm.bind(this)}/>

            <FormLabel>Variables</FormLabel>
            <TextInput
              style={{padding: 15}}
              multiline={true}
              numberOfLines={4}
              value={this.state.variables}
              onChangeText={text => this.updateForm({variables: text})}/>
          </View>}

        <SaveCancelButtons
          save={this.save.bind(this)}
          cancel={this.cancel.bind(this)}/>
      </View>
    )
  }
}