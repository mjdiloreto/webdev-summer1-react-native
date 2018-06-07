import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'
import {TitlePointsDescriptionPreview} from "./TitlePointsDescriptionPreview";

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
      exam: this.props.navigation.getParam("exam")
    }
  }

  updateForm(newState) {
    this.setState(newState)
  }

  render() {
    return(
      <View>
        <TitlePointsDescriptionPreview
          title={this.state.title}
          points={this.state.points}
          description={this.state.description}
          updateForm={this.updateForm.bind(this)}/>

        <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                  checked={this.state.isTrue} title='The answer is true'/>

        <Button	backgroundColor="green"
                 color="white"
                 title="Save"/>
        <Button	backgroundColor="red"
                 color="white"
                 title="Cancel"/>

        <Text h3>Preview</Text>
        <Text h2>{this.state.title}</Text>
        <Text>{this.state.description}</Text>

      </View>
    )
  }
}

export default TrueFalseQuestionEditor