import React, { useEffect, useState } from 'react'
import './room.scss'

import Player1 from '../../components/Player1'
import Player2 from '../../components/Player2'
import Controls from '../../components/Controls'
import { useSockets } from '../../context-providers/socket-hook'

const Game = () => {
  const {room, socket, setOption, setOption2, setScore, setEnemyScore} = useSockets()
  let player2 = Object.values(room.players)[1]
  
  const [result, setResult] = useState({
    show: false,
    reset: false,
    enemy: null
  })

  useEffect(() => {
    socket.on("room:get", (room) => {
      let opponent;
      
      Object.keys(room.players).filter((id, index) => {
        let oppId = id != socket.id
        if(oppId){
          opponent = Object.keys(room.players)[index]
        }
        return
      })
      
      let option1 = room.players[socket.id].option
      let option2 = opponent ? room.players[opponent].option : null
      
      if(option1 && option2){
        setResult({...result, show: true})
        
        setTimeout(() => {
          setResult({...result, show: false, reset: true, enemy: opponent})
          
          setOption(option1)
          setOption2(option2)
          
          let winner = getResult(option1, option2)
          updateRoom(room, socket, winner, opponent, setScore, setEnemyScore)
      }, 1900)
    }
  })
}, [])
  
  return (
    <div className='game-container'>
        <div className="game-body">
          <div className="playersInfo">
              <Player1 result={result} />
              <Player2 result={result} />
          </div>
          
          <div className="controls">
            {
              player2 && (
                <Controls />
              )
            }
          </div>
        </div>
    </div>
  )
}

export default Game

const getResult = (option1, option2) => {
  if (option1 === 'rock') {
    switch (option2) {
      case 'paper':
        return 'YOU LOSE'
      case 'sessiors':
        return 'YOU WON'
      default:
        return 'IT IS DRAW'
    }
  } else if (option1 === 'paper') {
    switch (option2) {
      case 'rock':
        return 'YOU WON'
      case 'sessiors':
        return 'YOU LOSE'
      default:
        return 'IT IS DRAW'
    }
  } else {
    switch (option2) {
      case 'rock':
        return 'YOU LOSE'
      case 'paper':
        return 'YOU WON'
      default:
        return 'IT IS DRAW'
    }
  }
}

const updateRoom = (room, socket, result, opponent, setScore, setEnemyScore) => {
  room.players[socket.id].option = null
  room.players[socket.id].optionLock = false
  room.players[opponent].option = null
  room.players[opponent].optionLock = false

  if (result === 'YOU WON') {
    let score = room.players[socket.id].score += 1
    room.players[opponent].score = room.players[opponent].score 
    setScore(score)
    socket.emit("room:update", room)
  } else{
    setEnemyScore(room.players[opponent].score += 1)
  }
}