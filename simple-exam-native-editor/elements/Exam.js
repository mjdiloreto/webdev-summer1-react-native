import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem, Text} from 'react-native-elements'
import {TitlePointsDescription} from "./TitlePointsDescription";

export default class Exam extends Component {
  static navigationOptions = {title: 'Exam'}

  constructor(props) {
    super(props);

    this.state = {
      questions: props.navigation.getParam('exam').questions,
      lessonId: props.navigation.getParam('lessonId'),
      exam: props.navigation.getParam('exam'),
      preview: false
    }

    this.updateForm = this.updateForm.bind(this);
  }

  updateForm(newState) {
    this.setState(newState);
  }

  navToQuestion(question) {
    console.log("going to question")
    console.log(question)
  }

  render() {
    return(
      <View style={{padding: 15}}>
        <TitlePointsDescription
          title={this.state.exam.title}
          points={this.state.exam.points}
          description={this.state.exam.description}/>

        {this.state.questions.map( (question, index) => (
          <ListItem
            key={index}
            title={question.title}
            onPress={this.navToQuestion(question)}/>
        ))}
      </View>
    )
  }
}