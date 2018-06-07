import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem, Text} from 'react-native-elements'
import {TitlePointsDescription} from "./TitlePointsDescription";
import {TitlePointsDescriptionPreview} from "./TitlePointsDescriptionPreview";

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
    let navigation = this.props.navigation;

    switch (question.type) {
      case "Essay":
        navigation.navigate("EssayQuestionEditor", {
          question: question,
          exam: this.state.exam
        });
        break;

      case "Blanks":
        navigation.navigate("FillInTheBlanksQuestionEditor", {
          question: question,
          exam: this.state.exam
        });
        break;

      case "Truefalse":
        navigation.navigate("TrueFalseQuestionEditor", {
          question: question,
          exam: this.state.exam
        });
        break;

      case "Choice":
        navigation.navigate("MultipleChoiceQuestionEditor", {
          question: question,
          exam: this.state.exam
        });
        break;

      default:
        return;
    }
  }

  render() {
    return(
      <View style={{padding: 15}}>

        {this.state.preview && <TitlePointsDescription
          title={this.state.exam.title}
          points={this.state.exam.points}
          description={this.state.exam.description}/>}

        {!this.state.preview && <TitlePointsDescriptionPreview
          title={this.state.exam.title}
          points={this.state.exam.points}
          description={this.state.exam.description}
          updateForm={this.updateForm.bind(this)}/>}

        {this.state.questions.map( (question, index) => (
          <ListItem
            key={index}
            title={question.title}
            onPress={() => this.navToQuestion(question)}/>
        ))}
      </View>
    )
  }
}