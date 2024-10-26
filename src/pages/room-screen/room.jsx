import React, { useState } from 'react'
import './room.scss'

import Player1 from '../../components/Player1'
import Player2 from '../../components/Player2'
import Controls from '../../components/Controls'
import { useSockets } from '../../context-providers/socket-hook'

const Game = () => {
  const {room, socket, setOption, setOption2} = useSockets()
  let player2 = Object.values(room.players)[1]
  
  const [result, setResult] = useState({
    show: false,
    reset: false,
    option_1: 'rock',
    option_2: 'rock'
  })

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
    let option2 = room.players[opponent].option || null
    
    if(option1 && option2){
      setOption(option1)
      setOption2(option2)
    }
  })

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