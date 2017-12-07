import React, { Component } from 'react';
import Choice from './Choice';
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passed: false,
      attempted: false,
      passedFirstTime: false,
      pointIncreased: false
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log("[QUESTION] componentWillReceiveProps()");
    // console.log("nextProps", nextProps)
    if (this.props.questionNumber !== nextProps.questionNumber)
      this.setState({
        passed: false,
        attempted: false,
        passedFirstTime: false,
        pointIncreased: false
      })
    else {
      // console.log("OLD QUESTION");
    }
  }
  markQuestionAnswered = (rightSelection) => {
    let {passed, attempted, passedFirstTime, pointIncreased} = this.state;

    // console.log("CHECKING QUESTION ANSWER STATUS...");
    // console.log("rightSelection", rightSelection)
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

    if (passed) {
      this.props.showNextButton();
      if (passedFirstTime && !pointIncreased) {
        pointIncreased = true;
        this.props.increasePoint();
      }
    }

    this.setState({passed, attempted, passedFirstTime, pointIncreased});
  }
  render() {
    console.log("question answered, render!");
    const { allChoices, questionNumber, correctAnswer, countryArr} = this.props;

    return (
      allChoices.map((each,index) => {
        return (
          <Choice
            key={questionNumber + "" + index}
            correctOption={(each !== correctAnswer)? false: true}
            countryName={countryArr[each].name}
            passed={this.state.passed}
            questionAnswered = {this.markQuestionAnswered}
          />
        )
      })

    )
  }
}

export default Question;
