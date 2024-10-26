import React from 'react'
import './waiting.scss'

function Waiting() {
  return (
    <div>
        <div className="waitingBody">
          <img src="/redUser.png" alt="personIcon" className='personIcon' />
          <b>Waiting for Opponent....</b>
        </div>
    </div>
  )
}

export default Waiting