import React, { Component } from 'react';

import QuestionImage from './../components/QuestionImage';
import Question from './Question';
class AppBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber:0,
      nextQuestionEnabled: false
    }
  }

  showNextQuestionHandler = () => {
    if (this.state.questionNumber+1<this.props.answerBankArray.length){
      this.setState({
        questionNumber: this.state.questionNumber+1,
        nextQuestionEnabled: false
      })
    }
  }

  enableNextQuestionButton = () => {
    this.setState({nextQuestionEnabled: true});
  }

  render () {
    let {questionNumber} = this.state;
    let correctCountry= this.props.countryArr[this.props.answerBankArray[questionNumber].correctAnswer];
    console.log("correctCountry", correctCountry);
    return (
      <div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <QuestionImage country={correctCountry} />
              </div>

              <div className="col-md-6">
                <h2>Question {questionNumber+1}/{this.props.answerBankArray.length}</h2>

                <Question
                  allChoices={this.props.answerBankArray[questionNumber].allChoices}
                  questionNumber={this.state.questionNumber}
                  correctAnswer={this.props.answerBankArray[questionNumber].correctAnswer}
                  countryArr={this.props.countryArr}
                  showNextButton={this.enableNextQuestionButton}
                />

              {
                (this.state.nextQuestionEnabled)?
                <button className="btn btn-sm" onClick={this.showNextQuestionHandler} >Next</button>
                :
                null
              }
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default AppBody;
