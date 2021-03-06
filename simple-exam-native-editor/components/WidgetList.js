import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import AssignmentWidget from './AssignmentWidget'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
      //widgets: [],
      assignments: [],
      exams: [],
      courseId: 1,
      moduleId: 1,
      lessonId: 1,
      preview: false
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const lessonId = navigation.getParam("lessonId");
    this.setState({lessonId});

    this.findAllAssignments(lessonId).then(() => this.findAllExams(lessonId));
  }

  findAllAssignments(lessonId) {
    return fetch(
      "http://fast-ocean-68598.herokuapp.com/api/lesson/"+lessonId+"/assignment")
      .then(response => (response.json()))
      .then(assignments => {
        this.setState({assignments})
      });
  }

  findAllExams(lessonId) {
    return fetch(
      "http://fast-ocean-68598.herokuapp.com/api/lesson/"+lessonId+"/exam")
      .then(response => (response.json()))
      .catch(response => console.log(response))
      .then(exams => {
        this.setState({exams})
      });
  }

  addAssignment(lessonId) {
    return fetch("http://fast-ocean-68598.herokuapp.com/api/lesson/"+lessonId+"/assignment",
      {
        headers: {"content-type": "application/json"},
        method: "POST",
        body: JSON.stringify({
          title: "new assignment",
          points: 0,
          description: "Description for new assignment"
        })
      })
      .then((response) => response.json())
      .then((assignment) => this.setState({
        assignments: [...this.state.assignments, assignment]
      }));
  }

  addExam(lessonId) {
    return fetch("http://fast-ocean-68598.herokuapp.com/api/lesson/"+lessonId+"/exam",
      {
        headers: {"content-type": "application/json"},
        method: "POST",
        body: JSON.stringify({
          "title": "new exam",
          "points": 0,
          "description": "Description for new exam",
          "questions": []
        })
      })
      .then((response) => response.json())
      .then((exam) => this.setState({
        exams: [...this.state.exams, exam]
      }));
  }

  render() {
    return(
      <View style={{padding: 15}}>

          {this.state.assignments.map(
              (assignment, index) => (
                  <ListItem
                      onPress={() => this.props.navigation
                          .navigate("AssignmentWidget",
                              {
                                  lessonId: this.state.lessonId,
                                  assignment: assignment,
                              })
                      }
                      key={index}
                      title={assignment.title}/>
              )
          )}

        {this.state.exams.map(
          (exam, index) => (
            <ListItem
              onPress={() => this.props.navigation
                .navigate("Exam", {
                  lessonId: this.state.lessonId,
                  exam: exam
                })}
              key={this.state.assignments.length + index}
              title={exam.title}/>
            )
          )
        }

        <Button title="new assignment"
                backgroundColor="green"
                onPress={() => this.addAssignment(this.state.lessonId)}/>
        <Button title="new exam"
                backgroundColor="green"
                onPress={() => this.addExam(this.state.lessonId)}/>
      </View>
    )
  }
}
export default WidgetList