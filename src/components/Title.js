import React  from 'react';

const Title = ({content,missedLetters,guesses}) => {
    const words = content.split(/[ ,]+/)
    const splitWrd = words.map((item) => item.split(""))
    const letters = splitWrd.map((word,key) => {
      return (
        <ul key={`word_${key}`} className='flex'>
          {
            word.map((letter,ckey) => {
              return (
                <li
                  className="title-letter pad10"
                  key={`child_${ckey}`}
                  data-missed={missedLetters.includes(letter) ? true : false}
                >
                <span className={guesses.includes(letter) ? 'visible':'hidden' }>
                  {letter}
                </span>
               </li>
              )
            })
          }
        </ul>
      )
    })
    return (
      <div className='flex'>
        { letters }
      </div>
    )
  }

  export default Title
