import './waiting.scss'

import redUser from "../../assets/redUser.svg"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Waiting() {
  let isPrivate = window.location.href.split("/")[3].includes('private')
  return (
    <div>
      {
        isPrivate ? (
        <div className="waitingBody">
          <img src={redUser} alt="personIcon" className='personIcon' />
          {/* <input type='text'>{window.location.href + '?join=true'}</input> */}
          
          {/* <input type='text' id='url' value={window.location.href + '?join=true'}/>
          <button>
            Copy
          </button> */}
          <InputGroup className="mb-3">
            <Form.Control
              value={window.location.href + '?join=true'}
              placeholder="Room Pass"
              aria-label="Room Pass"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={(e) => e.target}>
              Button
            </Button>
          </InputGroup>
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