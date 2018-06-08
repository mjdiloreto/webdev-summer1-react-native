import React, {Component} from 'react'
import {View} from 'react-native'
import {ListItem, Text} from 'react-native-elements'
import {TitlePointsDescription} from "./TitlePointsDescription";
import {TitlePointsDescriptionPreview} from "./TitlePointsDescriptionPreview";
import {PreviewButton} from "./PreviewButton";
import {SaveCancelButtons} from "./SaveCancelButtons";

export default class Exam extends Component {
  static navigationOptions = {title: 'Exam'}

  constructor(props) {
    super(props);

    this.state = {
      questions: props.navigation.getParam('exam').questions,
      lessonId: props.navigation.getParam('lessonId'),
      exam: props.navigation.getParam('exam'),
      title: props.navigation.getParam('exam').title,
      points: props.navigation.getParam('exam').points,
      description: props.navigation.getParam('exam').description,
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

  save = () => {
    this.state.exam.title = this.state.title;
    this.state.exam.description = this.state.description;
    this.state.exam.points = this.state.points;

    fetch('http://fast-ocean-68598.herokuapp.com/api/exam/'+this.state.exam.id,
      {
        method: 'put',
        body: JSON.stringify(this.state.exam),
        headers: {
          'content-type': 'application/json'}
      }).then(() => this.props.navigation.goBack())
  }

  cancel = () => {
    this.props.navigation.goBack();
  }

  render() {
    return(
      <View style={{padding: 15}}>

        <PreviewButton updateForm={this.updateForm.bind(this)}
          preview={this.state.preview}/>

        {this.state.preview && <TitlePointsDescription
          title={this.state.title}
          points={this.state.points}
          description={this.state.description}/>}

        {!this.state.preview && <TitlePointsDescriptionPreview
          title={this.state.title}
          points={this.state.points}
          description={this.state.description}
          updateForm={this.updateForm.bind(this)}/>}

        {this.state.questions.map( (question, index) => (
          <ListItem
            key={index}
            title={question.title}
            onPress={() => this.navToQuestion(question)}/>
        ))}

        <SaveCancelButtons save={this.save.bind(this)}
          cancel={this.cancel.bind(this)}/>
      </View>
    )
  }
}