import React, { Component } from 'react';
import './App.css';
import Title from './components/Title'
import Digits from './components/Digits'
import Diagram from './components/Diagrams'
import GameOver from './components/GameOver'
import GameWin from './components/Gamewin';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentList:2,
      guesses:[],
      missedLetters:[],
      goodGuess:[],
      diagram:1,
      retriesLeft:6,
      finalText:'',
      movieData:[] ,
      newGame:true
    }
    this.letters = /^([a-zA-Z0-9]+)$/
    this.getTitle = this.getTitle.bind(this)
    this.onAlphabetClick = this.onAlphabetClick.bind(this)
    this.resetGame = this.resetGame.bind(this)
  }
  componentDidMount() {
    this.fetchData()
  }
  async fetchData() {
    try {
      const response = await fetch('https://restcountries.eu/rest/v2/all');
      let data = await response.json()
      let randomData = data.sort(() => {
        return 0.5 - Math.random()
      })
      this.setState({
        movieData:randomData
      })
      }catch(error) {
        console.log(error);
      }
    }
  onAlphabetClick(e) {
    var letter = e.target.dataset.content.toLowerCase();
    return letter.length > 1 ? null : this.verifyLetter(letter)

  }
  updateImage() {
    this.setState((prevState) => ({
      diagram:prevState.diagram + 1,
      retriesLeft:prevState.retriesLeft - 1
    }), this.isGameOver)
  }
  resetGame() {
    this.setState((prevState) => ({
      currentList:prevState.currentList + 1,
      diagram:1,
      retriesLeft:6,
      goodGuess:[],
      missedLetters:[],
      guesses:[],
      newGame:true,
      finalText:''
    }))
  }
  loadRest() {
    var missedLetters = this.getTitle().split('').filter((letter) => !this.state.guesses.includes(letter))
    this.setState((prevState) => ({
      missedLetters,
      guesses:[...prevState.guesses,...missedLetters]
    }))
  }
  isGameOver(result){
    if(this.state.retriesLeft === 0) {
      this.setState({
        newGame:false,
        finalText:'loose'
      },this.loadRest)
    }else if(result === 'win') {
      this.setState({
        newGame:true,
        finalText:'win'
      })
    }
  }
  isWin() {
    let titleSet = new Set(this.getTitle().split(/[ ,]+/).join(''))
    if(titleSet.size === this.state.goodGuess.length) {
        this.isGameOver('win')
    }
  }
  verifyLetter(letter) {

    this.setState((prevState) => ({
      guesses:[...prevState.guesses, letter]
    }))
    if(!this.getTitle().includes(letter)) {
        this.updateImage()
    } else {
      this.setState((prevState) => ({
        goodGuess:[...prevState.goodGuess, letter]
      }), this.isWin)
    }


  }
  getTitle() {
    const wordData = this.state.movieData[this.state.currentList].name
    return wordData.split('').filter((item) => {
      if(this.letters.test(item) || item === ' '){
        return item
      }
    }).join('')    
  }

  render() {
    if(this.state.movieData.length <= 0) {
      return (
          <div className='hangmanApp'>
            Please wait whe are loading the game for you...
          </div>
      )
    }

    return (
      <div className="hangmanApp">
        <GameWin
          newGame={this.state.newGame}
          text={this.state.finalText}
          resetGame={this.resetGame}
        >
        </GameWin>
        <GameOver
          newGame={this.state.newGame}
          text={this.state.finalText}
          resetGame={this.resetGame}
        >
        </GameOver>
        <Diagram
          diagramId={this.state.diagram}
        />
        <Title
          guesses={this.state.guesses}
          content={this.getTitle()}
          missedLetters={this.state.missedLetters}
        ></Title>
      <Digits
        newGame={this.state.newGame}
        guesses={this.state.guesses}
        onAlphabetClick={this.onAlphabetClick}
      />

      </div>
    );
  }

}

export default App;
