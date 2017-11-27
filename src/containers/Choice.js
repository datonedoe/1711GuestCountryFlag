import React, { Component } from 'react';

import './Choice.css';

class Choice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      highlighted: false
    }
  }


  handleClick = () => {
    if (this.props.correctOption) {
      this.setState({highlighted: true})
      this.props.questionAnswered(true);
    } else {
      this.setState({disabled: true});
      this.props.questionAnswered(false);
    }
  }

  render() {
      console.log(this.state);

      let choiceClassName = `Choice ${(!this.state.disabled) ? "" : "wrongAnswer"} ${(this.state.highlighted) ? "rightAnswer" : ""}`;

    return (
      <div className={choiceClassName} onClick={this.handleClick} disabled={this.state.disabled}>
        <strong>{this.props.countryName}</strong>
      </div>
    )
  }
}

export default Choice;
