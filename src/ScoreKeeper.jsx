import React, { useState } from 'react'
import './ScoreKeeper.css'

export default function ScoreKeeper() {
  const [numPlayers, setNumPlayers] = useState(3)
  const [target, setTarget] = useState(5)
  const [scores, setScores] = useState(Array(numPlayers).fill(0))
  const [gameEnded, setGameEnded] = useState(false)

  const updateScore = index => {
    if (!gameEnded) {
      setScores(prevScores =>
        prevScores.map((score, i) => (i === index ? score + 1 : score))
      )

      if (scores[index] + 1 >= target) {
        setGameEnded(true)
      }
    }
  }

  const resetGame = () => {
    setScores(Array(numPlayers).fill(0))
    setGameEnded(false)
  }

  const startGame = () => {
    setScores(Array(numPlayers).fill(0))
    setGameEnded(false)
  }

  return (
    <div className='ScoreKeeper'>
      <h1>Score Keeper</h1>
      <div>
        <label>Number of players:</label>
        <input
          type='number'
          value={numPlayers}
          onChange={e => setNumPlayers(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Target score:</label>
        <input
          type='number'
          value={target}
          onChange={e => setTarget(Number(e.target.value))}
        />
      </div>
      <button onClick={startGame}>Start Game</button>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            Player {index + 1}: {score}
            <button disabled={gameEnded} onClick={() => updateScore(index)}>
              +1
            </button>
            {score >= target && ' WINNER!'}
          </li>
        ))}
      </ul>
      <button onClick={resetGame}>Reset Scores</button>
    </div>
  )
}
