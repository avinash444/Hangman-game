import React from 'react'

const GameOver = ({newGame,text,resetGame}) => {
  return (
    <div>
    <div className={text === 'loose' ? 'flex' : 'none'}>
      <div className="">its an easy move you missed it</div>
      <div className='mr-l52'>
        <div>Retry again</div>
        <button className='icon-reset cursor' onClick={resetGame}></button>
      </div>
    </div>
    </div>

  )
}

export default GameOver
