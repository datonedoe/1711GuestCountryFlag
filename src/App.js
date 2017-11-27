import React, { Component } from 'react';
import Header from './components/Header';
import AppBody from './containers/AppBody';
class App extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      countryArr: [],
      answerBankArray: []
      }
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
        console.log("this.state", this.state)
      })
    }


  getAnswerBankArray = (maxArrLength) => {
      let bankArray = [];

      for (var i=0;i<15; i++) {
        var arr = [];
        while(arr.length < 4){
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
            <div>Loading</div> :
            <AppBody countryArr={this.state.countryArr} answerBankArray={this.state.answerBankArray}/>
          }

      </div>
    );
  }
}

export default App;
