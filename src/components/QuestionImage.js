import React, { Component } from 'react';
import './QuestionImage.css';

class QuestionImage extends Component {

  constructor(props){
    super(props)
    this.state = {
      imgStatus: "loading",
      imgUrl :this.props.country.flag
    };
  }


  componentWillReceiveProps(nextProps) {
    // console.log("this.props", this.props);
    // console.log("nextProps", nextProps);
    if (this.props.country.name !== nextProps.country.name) {
      this.setState({
        imgStatus: "loading"
      })
    }
  }

  handleImageLoaded() {
    this.setState({
      imgStatus: "loaded"
    });
  }

  handleImageErrored() {
    this.setState({
      imgStatus: "failed"
    });
  }



  render() {

    let flagClassName= (this.state.imgStatus==="loaded"? "img-responsive showFlag" : "img-responsive hideFlag")
    return (
      <div>

        <img
          className={flagClassName}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
          src={this.props.country.flag}
          alt={this.props.country.name}/>

        {this.state.imgStatus==="loaded" ? null : <div className="signal"></div>}
        {/*
          <div>flagClassName: {flagClassName}</div>
          <p className="small">{this.props.country.name}</p>
        */}
      </div>
    )

  }
}

export default QuestionImage;
