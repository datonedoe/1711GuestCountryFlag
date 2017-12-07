import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppBody from './containers/AppBody';
import './App.css';

const NUM_OF_QUESTION = 5;
const NUM_OF_CHOICES = 4;
class App extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      countryArr: [],
      answerBankArray: []
      }
    }

    restart =() => {
      this.setState({
        countryArr: [],
        answerBankArray: []
      }, this.componentDidMount())
    }

  componentDidMount() {
    const url="http://restcountries.eu/rest/v2/all";

    fetch(url)
      .then(data =>data.json())
      .then(data => {

        let bankArray = this.getAnswerBankArray(data.length);
        this.setState({
          countryArr: data,
          answerBankArray: bankArray
        })
      })
      .then(() => {
        // console.log("this.state", this.state)
      })
    }


  getAnswerBankArray = (maxArrLength) => {
      let bankArray = [];

      for (var i=0;i<NUM_OF_QUESTION; i++) {
        var arr = [];
        while(arr.length < NUM_OF_CHOICES){
              var randomnumber = Math.floor(Math.random()*maxArrLength);
              if(arr.indexOf(randomnumber) > -1) continue;
              arr[arr.length] = randomnumber;
            }
        bankArray = [...bankArray, { correctAnswer: arr[0], allChoices: this.shuffle(arr)}]
      }
      return bankArray;
  }

  shuffle = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  render() {

    return (
      <div>
          <Header />
          {
            (this.state.countryArr.length<=0) ?
            <div className="pageLoader">
              <div className="wrapper">
                <div className="circle circle-1"></div>
                <div className="circle circle-1a"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
              </div>
              <h1>Loading&hellip;</h1>
            </div> :
            <AppBody restart={this.restart} countryArr={this.state.countryArr} answerBankArray={this.state.answerBankArray}/>
          }
          <Footer />
      </div>
    );
  }
}

export default App;
