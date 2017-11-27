import React, { Component } from 'react';

class QuestionImage extends Component {

  constructor(props){
    super(props)
    this.state = {
      imgStatus: "loading",
      imgUrl :this.props.country.flag
    };
  }


  componentWillReceiveProps(nextProps) {
    this.setState({  imgUrl: nextProps.flag})
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

  handleImageStatusMessage = () => {
    console.log("this.state.imgStatus", this.state.imgStatus)
    switch(this.state.imgStatus) {
      case "loading":
        return <div>Loading image</div>;
      case "loaded":
        return <div>Loaded</div>;
      case "failed":
        return <div>Something went wrong.</div>
      default:
        return <div>SAY SOMETHING</div>;
    }
  }


  render() {

    return (
      <div>
    
        <img
          className="img-responsive"
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
          src={this.props.country.flag}
          alt={this.props.country.name}/>
        <p className="small">{this.props.country.name}</p>

      </div>
    )

  }
}

export default QuestionImage;
