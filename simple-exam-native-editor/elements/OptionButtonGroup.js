import React, {Component} from 'react'
import {ButtonGroup} from 'react-native-elements'

class OptionButtonGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optionIndex: 0,
      options: props.options,
    };
    this.selectOption = this.selectOption.bind(this)
  }

  selectOption = (newOptionIndex) => {
    this.setState({
      optionIndex: newOptionIndex
    })
  }

  render() {
    return(
      <ButtonGroup
        onPress={this.selectOption}
        selectedIndex={this.state.optionIndex}
        buttons={this.state.options}
        containerStyle={{height: 75}}/>
    )
  }
}

export default OptionButtonGroup