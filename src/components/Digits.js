import React, { Component } from 'react'

export default class Digits extends Component {
  constructor(props) {
    super(props)
    this.alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('')
  }

  render() {
    const { guesses, newGame, onAlphabetClick } = this.props
    return (
      <div>
        <ul className={ newGame ? 'flex' : 'none'}>
          {
            this.alphabets.map((wrd,key) => {
              return (
                <li
                  key={`wrd_${key}`}
                  className={guesses.includes(wrd) ? 'disable pad10 fs-22' : 'active pad10 fs-22'}
                  data-content={wrd}
                  onClick={onAlphabetClick}
                  >
                  {wrd}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
