import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import {ListItem, Text, ButtonGroup, Button} from 'react-native-elements'
import {TitlePointsDescription} from "./TitlePointsDescription";
import {TitlePointsDescriptionPreview} from "./TitlePointsDescriptionPreview";
import {PreviewButton} from "./PreviewButton";
import {SaveCancelButtons} from "./SaveCancelButtons";
import OptionButtonGroup from "./OptionButtonGroup";

const newBlanks = {
  "title": "New Fill in the Blanks",
  "description": "Description for Fill in the Blanks",
  "points": 0,
  "variables": "",
  "type": "Blanks"
};

const newChoice = {
  "title": "New Multiple Choice",
  "description": "Description for Multiple Choice",
  "points": 0,
  "choices": "",
  "type": "Choice"
}

const newEssay = {
  "title": "New Essay",
  "description": "Description for Essay",
  "points": 0,
  "type": "Essay"
}

const newTrueFalse = {
  "title": "New True False",
  "description": "Description for True False",
  "points": 0,
  "isTrue": true,
  "type": "TrueFalse"
}

export default class Exam extends Component {
  static navigationOptions = {title: 'Exam'};

  static questionTypes = ["essay", "choice", "blanks", "truefalse"];

  constructor(props) {
    super(props);

    this.state = {
      questions: props.navigation.getParam('exam').questions,
      lessonId: props.navigation.getParam('lessonId'),
      exam: props.navigation.getParam('exam'),
      title: props.navigation.getParam('exam').title,
      points: props.navigation.getParam('exam').points,
      description: props.navigation.getParam('exam').description,
      newQuestionType: 0,
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
        navigation.navigate("FillInTheBlankQuestionEditor", {
          question: question,
          exam: this.state.exam
        });
        break;

      case "TrueFalse":
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

  addQuestion(questionType) {

    console.log("the new question type is")
    console.log(questionType)

    let newQuestion;

    switch (questionType) {
      case "essay":
        newQuestion = newEssay;
        break;
      case "truefalse":
        newQuestion = newTrueFalse;
        break;
      case "choice":
        newQuestion = newChoice;
        break;
      case "blanks":
        newQuestion = newBlanks;
        break;
      default:
        return;
    }

    return fetch('http://fast-ocean-68598.herokuapp.com/api/exam/'+this.state.exam.id+'/'+questionType,
      {
        headers: {'content-type': 'application/json'},
        method: "POST",
        body: JSON.stringify(newQuestion)
      }).then((response) => response.json())
      .then((question) => {
        this.setState({questions: [...this.state.questions, question]})
      })
  }

  render() {
    return(
      <ScrollView style={{padding: 15}}>

        <PreviewButton updateForm={this.updateForm.bind(this)}
          preview={this.state.preview}/>

        {this.state.preview && <TitlePointsDescription
          title={this.state.title}
          points={this.state.points}
          description={this.state.description}/>}

        {!this.state.preview &&
        <View>
          <TitlePointsDescriptionPreview
            title={this.state.title}
            points={this.state.points}
            description={this.state.description}
            updateForm={this.updateForm.bind(this)}/>

          <ButtonGroup
            onPress={(newIndex) => this.setState({newQuestionType: newIndex})}
            selectedIndex={this.state.newQuestionType}
            buttons={Exam.questionTypes}
            containerStyle={{height: 75}}/>

          <Button title="new question"
                  backgroundColor="green"
                  onPress={() => {
                    console.log("the index is")
                    console.log(this.state.newQuestionType)
                    this.addQuestion(Exam.questionTypes[this.state.newQuestionType])
                  }
                  }/>
        </View>}

        {this.state.questions.map( (question, index) => (
          <ListItem
            key={index}
            title={question.title}
            onPress={() => this.navToQuestion(question)}/>
        ))}

        <SaveCancelButtons save={this.save.bind(this)}
          cancel={this.cancel.bind(this)}/>
      </ScrollView>
    )
  }
}