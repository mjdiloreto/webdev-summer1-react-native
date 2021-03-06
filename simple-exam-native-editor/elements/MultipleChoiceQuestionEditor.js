import React from 'react'
import {View, Picker} from 'react-native'
import {FormLabel, FormInput} from 'react-native-elements'
import {TitlePointsDescription} from "./TitlePointsDescription";
import {PreviewButton} from "./PreviewButton";
import {TitlePointsDescriptionPreview} from "./TitlePointsDescriptionPreview";
import {SaveCancelButtons} from "./SaveCancelButtons";
import OptionButtonGroup from "./OptionButtonGroup";

class MultipleChoiceQuestionEditor extends React.Component {
  static navigationOptions = { title: "Multiple Choice"}
  constructor(props) {
    super(props)

    let question = this.props.navigation.getParam("question");

    this.state = {
      question: question,
      exam: this.props.navigation.getParam("exam"),
      title: question.title,
      description: question.description,
      points: question.points,
      choices: question.choices,
      selectedChoice: 0,
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
    this.state.question.choices = this.state.choices;

    fetch('http://fast-ocean-68598.herokuapp.com/api/choice/'+this.state.question.id,
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

        <PreviewButton
          updateForm={this.updateForm.bind(this)}
          preview={this.state.preview}/>

        {this.state.preview &&
        <View>
          <TitlePointsDescription
            title={this.state.title}
            points={this.state.points}
            description={this.state.description}/>

          <OptionButtonGroup
            options={this.state.choices.split("\\n")}/>
        </View>}

        {!this.state.preview &&
        <View>
          <TitlePointsDescriptionPreview
          title={this.state.title}
          points={this.state.points}
          description={this.state.description}
          updateForm={this.updateForm.bind(this)}/>

          <FormLabel>Choices</FormLabel>
          <FormInput
            value={"" + this.state.choices.split("\\n")}
            onChangeText={
            text => this.updateForm({choices: text.split(",").join("\\n")})
          }/>
        </View>}

        <SaveCancelButtons
          save={this.save.bind(this)}
          cancel={this.cancel.bind(this)}/>

      </View>
    )
  }
}

export default MultipleChoiceQuestionEditor