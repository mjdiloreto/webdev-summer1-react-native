import React from 'react'
import {View, Picker, Tex} from 'react-native'
import {FormLabel, FormInput, Text} from 'react-native-elements'
import {TitlePointsDescription} from "./TitlePointsDescription";
import {PreviewButton} from "./PreviewButton";
import {TitlePointsDescriptionPreview} from "./TitlePointsDescriptionPreview";
import {SaveCancelButtons} from "./SaveCancelButtons";
import OptionButtonGroup from "./OptionButtonGroup";

export default class EssayQuestionEditor extends React.Component {
  static navigationOptions = { title: "Essay"}

  constructor(props) {
    super(props);

    let question = this.props.navigation.getParam("question");
    this.state = {
      question: question,
      exam: this.props.navigation.getParam("exam"),
      title: question.title,
      description: question.description,
      points: question.points,
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

    fetch('http://fast-ocean-68598.herokuapp.com/api/essay/'+this.state.question.id,
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

            <TextInput
              style={{padding: 15}}
              multiline={true}
              numberOfLines={6}
              value="Your answer"/>

          </View>}

        {!this.state.preview &&
          <TitlePointsDescriptionPreview
          title={this.state.title}
          points={this.state.points}
          description={this.state.description}
          updateForm={this.updateForm.bind(this)}/>}

        <SaveCancelButtons
          save={this.save.bind(this)}
          cancel={this.cancel.bind(this)}/>

      </View>
    )
  }
}