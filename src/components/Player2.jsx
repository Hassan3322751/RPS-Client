import React, { useEffect, useState } from 'react'
import '../pages/room-screen/room.scss'

import { useSockets } from '../context-providers/socket-hook'
import { FaStar } from 'react-icons/fa6'
import Waiting from './waiting/Waiting'

const Player2 = () => {
  const {room, option2} = useSockets()
  const [score] = useState(2)
  
  let player2 = Object.values(room.players)[1]
  
  return (
    <div className='player_2'>
      {
        !player2 ? (
          <Waiting />
        ) : (
          <>
            <div className="score enemy">
              <div className="stars">
                {[...Array(3).keys()].map((ele, index) =>
                  index + 1 <= score ? (
                    <FaStar key={index} color='red' size='3rem' />
                  ) : (
                    <FaStar key={index} color='white' size='3rem' />
                  )
                )}
              </div>

              <div className="personIcon">
                <img src="/redUser.png" alt="You" />
              </div>
            </div>

            <div className="enemyMove">
              {option2 === 'rock' && (
                <img src="/rock.png" alt="You" style={{...size, ...flip}} />
              )}
              {option2 === 'paper' && (
                <img src="/paper.png" alt="You" style={{...size, ...flip}} />
              )}
              {option2 === 'sessiors' && (
                <img src="/scissors.png" alt="You" style={size} />
              )}
            </div>
          </>
        )
      }
    </div>
  )
}

export default Player2

const size = {
  width: '370px',
  marginLeft: '-22px'
}

const flip = {
  transform: 'rotateY(-180deg)'
}