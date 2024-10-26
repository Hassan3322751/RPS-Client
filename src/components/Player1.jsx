import React, { useEffect, useState } from 'react'
import '../pages/room-screen/room.scss'
import { FaStar } from "react-icons/fa6";

import { useSockets } from '../context-providers/socket-hook'

const Player1 = ({result}) => {
  const {option} = useSockets()
  const [score, setScore] = useState(2)
  
  return (
    <div className='player_1'>

      <div className="score">
        <div className="personIcon">
          <img src="/goldenUser.png" alt="You" />
        </div>
        <div className="stars">
          {[...Array(3).keys()].map((ele, index) =>
            index + 1 <= score ? (
              <FaStar key={index} color='gold' size='3rem' />
            ) : (
              <FaStar key={index} color='white' size='3rem' />
            )
          )}
        </div>
      </div>

      <div className="yourMove">
        {
          !option ? (
            <img src="/rock.png" alt="You" style={size} />
          ) 
          : option === 'rock' ? (
            <img src="/rock.png" alt="You" style={size} />
          )
          : option === 'paper' ? (
            <img src="/paper.png" alt="You" style={size} />
          )
          : option === 'sessiors' && (
            <img src="/scissors.png" alt="You" style={{...size, ...scissorStyle}} />
          )
        }
      </div>

    </div>
  )
}

export default Player1

const size = {
  width: '370px',
  marginLeft: '-22px'
}

const scissorStyle = {
  transform: 'rotateY(180deg)'
}