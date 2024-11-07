import './waiting.scss'

import redUser from "../../assets/redUser.svg"

function Waiting() {
  let isPrivate = window.location.href.split("/")[3].includes('private')
  return (
    <div>
      {
        isPrivate ? (
        <div className="waitingBody">
          <img src={redUser} alt="personIcon" className='personIcon' />
          <b>{window.location.href + '?join=true'}</b>
        </div>

        ) : (

        <div className="waitingBody">
          <img src={redUser} alt="personIcon" className='personIcon' />
          <b>Waiting for Opponent....</b>
        </div>
        )
      }
    </div>
  )
}

export default Waiting