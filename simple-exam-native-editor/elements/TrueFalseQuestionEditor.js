import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'
import {TitlePointsDescriptionPreview} from "./TitlePointsDescriptionPreview";
import {TitlePointsDescription} from "./TitlePointsDescription";
import {PreviewButton} from "./PreviewButton";
import {SaveCancelButtons} from "./SaveCancelButtons";

class TrueFalseQuestionEditor extends React.Component {
  static navigationOptions = { title: "True False"}
  constructor(props) {
    super(props)

    let question = this.props.navigation.getParam("question");
    this.state = {
      question: question,
      title: question.title,
      description: question.description,
      points: question.points,
      isTrue: question.isTrue,
      exam: this.props.navigation.getParam("exam"),
      preview: false
    }
  }

  updateForm(newState) {
    this.setState(newState)
  }

  save = () => {
    this.state.question.title = this.state.title;
    this.state.question.description = this.state.description;
    this.state.question.points = this.state.points;
    this.state.question.isTrue = this.state.isTrue;

    fetch('http://fast-ocean-68598.herokuapp.com/api/truefalse/'+this.state.question.id,
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
    return(
      <View>
        <PreviewButton updateForm = {this.updateForm.bind(this)}
          preview={this.state.preview}/>

        {this.state.preview &&
        <View>
          <TitlePointsDescription
            title={this.state.title}
            points={this.state.points}
            description={this.state.description}/>
          <CheckBox title='the answer is true'/>
        </View>}


        {!this.state.preview &&
        <View>
            <TitlePointsDescriptionPreview
              title={this.state.title}
              points={this.state.points}
              description={this.state.description}
              updateForm={this.updateForm.bind(this)}/>
            <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
              checked={this.state.isTrue} title='The answer is true'/>
        </View>}

        <SaveCancelButtons save={this.save.bind(this)}
          cancel={this.cancel.bind(this)}/>

      </View>
    )
  }
}

export default TrueFalseQuestionEditor