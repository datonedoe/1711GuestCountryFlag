import React, { Component } from 'react';
import Choice from './Choice';
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passed: false,
      attempted: false,
      passedFirstTime: false
    }
    this.markQuestionAnswered = this.markQuestionAnswered.bind(this);
  }

  markQuestionAnswered = (rightSelection) => {
    let {passed, attempted, passedFirstTime} = this.state;

    console.log("question answered!")

    if (!attempted) {
      attempted = true;
      if (rightSelection) {
        passed=true;
        passedFirstTime=true;
      }
    } else {
      if (rightSelection) {
        passed=true;
      }
    }

    this.setState({passed, attempted, passedFirstTime});
    this.props.showNextButton();
  }
  render() {
    const { allChoices, questionNumber, correctAnswer, countryArr} = this.props;
    console.log("QUESTION state", this.state);

    return (
      allChoices.map((each,index) => {
        return (
          <Choice
            key={questionNumber + "" + index}
            correctOption={(each !== correctAnswer)? false: true}
            countryName={countryArr[each].name}
            questionAnswered = {this.markQuestionAnswered}
          />
        )
      })

    )
  }
}

export default Question;
