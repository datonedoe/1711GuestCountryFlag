import React, { Component } from 'react';

import QuestionImage from './../components/QuestionImage';
import Question from './Question';
import { Modal, Button } from 'react-bootstrap';
import './AppBody.css';

class AppBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber:0,
      nextQuestionEnabled: false,
      point: 0,
      endOfQuiz: false,
      showModal: false
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

  enableNextTaskButton = () => {
    if(this.state.questionNumber===this.props.answerBankArray.length-1){
      this.setState({endOfQuiz: true})
    } else {
      this.setState({nextQuestionEnabled: true});
    }
  }

  finish = () => {
    this.setState({ showModal: true });
  }

  close = () => {
    this.setState({ showModal: false });
  }

  increasePointHandler = () => {
      // console.log("[APPBODY] increasePointHandler() accessed")
     this.setState( {point: this.state.point+1})
  }

  render () {
    let {questionNumber} = this.state;
    let correctCountry= this.props.countryArr[this.props.answerBankArray[questionNumber].correctAnswer];
    // console.log("correctCountry", correctCountry);
    return (
      <div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p className="score">SCORE: {this.state.point}</p>
              </div>
              <div className="col-md-6">
                <QuestionImage country={correctCountry} />
              </div>

              <div className="col-md-6">
                <h2 className="question-number">Question {questionNumber+1}/{this.props.answerBankArray.length}</h2>
                <br />
                <Question
                  allChoices={this.props.answerBankArray[questionNumber].allChoices}
                  questionNumber={this.state.questionNumber}
                  correctAnswer={this.props.answerBankArray[questionNumber].correctAnswer}
                  countryArr={this.props.countryArr}
                  showNextButton={this.enableNextTaskButton}
                  increasePoint={this.increasePointHandler}
                />

              {
                (this.state.endOfQuiz) ?
                  <div className="navButton">
                    <button  className="btn btn-sm" onClick={this.finish}>Finish</button>
                  </div>
                  :
                  null
              }

              {
                (this.state.nextQuestionEnabled) ?
                  <div className="navButton">
                    <button className="btn btn-sm" onClick={this.showNextQuestionHandler} >Next</button>
                  </div>
                  :
                  null
              }

              <Modal show={this.state.showModal} onHide={this.close}>

                <Modal.Header className="modal-header" closeButton>
                  <Modal.Title>Results</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <div className="final-message">
                  <div>Congratulations!</div>
                  <div>Your final score is <strong>{this.state.point}</strong></div>
                </div>
                </Modal.Body>

                <Modal.Footer className="modal-footer">
                  <Button onClick={this.props.restart}>Restart</Button>
                  <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
              </Modal>



              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default AppBody;
