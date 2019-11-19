import React from 'react'

 const GameWin = ({newGame,text,resetGame}) => {
  return (
    <div>
      <h2 className='fontW800'>Hangman Game</h2>
      <p className={text === ('win' || 'loose') ? 'hidden':'visible'}>Guess the country names</p>
      <div className={ text === 'win' ? 'flex' : 'none' }>
        <div>hooray! you won the game</div>
        <div className='mr-l52'>
          <div>play another one</div>
          <button className='icon-reset cursor' onClick={resetGame}></button>
        </div>

      </div>
    </div>

  )
}
export default GameWin
