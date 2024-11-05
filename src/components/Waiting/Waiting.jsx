import React from 'react'
import './waiting.scss'

function Waiting() {
  let isPrivate = window.location.href.split("/")[3].includes('private')
  return (
    <div>
      {
        isPrivate ? (
        <div className="waitingBody">
          <img src="/redUser.png" alt="personIcon" className='personIcon' />
          <b>{window.location.href + '?join=true'}</b>
        </div>

        ) : (

        <div className="waitingBody">
          <img src="/redUser.png" alt="personIcon" className='personIcon' />
          <b>Waiting for Opponent....</b>
        </div>
        )
      }
    </div>
  )
}

export default Waiting