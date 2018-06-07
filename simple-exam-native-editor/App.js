import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeButtonGroupChooser from './elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'
import ScreenX from './elements/ScreenX'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import AssignmentWidget from './components/AssignmentWidget'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <ScrollView>
        <StatusBar barStyle="light-content"/>
        <FixedHeader/>

        <Button title="Courses"
                onPress={() => this.props.navigation
                  .navigate('CourseList') } />
        <Button title="Go to been X"
                onPress={() => this.props.navigation
                  .navigate('ScreenX') } />
        <Button title="Go to Screen A"
                onPress={() => this.props.navigation
                  .navigate('ScreenA') } />
        <Button title="Go to Screen B"
                onPress={() => this.props.navigation
                  .navigate('ScreenB') } />


        <TrueFalseQuestionEditor/>

        <QuestionTypeButtonGroupChooser/>
        <QuestionTypePicker/>

        <Icons/>
        <View style={{padding: 20}}>
          <TextHeadings/>
        </View>
      </ScrollView>
    )
  }
}

class ScreenA extends React.Component {
  static navigationOptions = {title: "Screen A"}
  constructor(props) {
    super(props)
      this.state = {
        text: "butt"
    }
  }
  componentDidMount() {
      fetch('http://fast-ocean-68598.herokuapp.com/api/course')
          .then(response => (response.text()))
          .then(courses => {
              this.setState({text: courses});
          });
  }
  render() {
    return (
      <View>
        <Text h1>Screen A</Text>
          <Text h3>{this.state.text}</Text>
        <Button title="Go 2"
                onPress={() =>this.props
                  .navigation
                  .goBack()} />
      </View>
    )
  }
}

const ScreenB = () => (
  <View>
    <Text h1>Screen B</Text>
  </View>
)

const App = createStackNavigator({
  Home,
  CourseList,
  ModuleList,
  LessonList,
  WidgetList,
  Exam,
  QuestionList,
  AssignmentWidget,
  TrueFalseQuestionEditor,
  MultipleChoiceQuestionEditor,
  ScreenA,
  ScreenB,
  ScreenX
});

export default App;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
