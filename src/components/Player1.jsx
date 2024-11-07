import { useEffect, useState } from 'react';
import '../pages/room-screen/room.scss';
import { FaStar } from "react-icons/fa6";
import { useSockets } from '../context-providers/socket-hook';

import paperSvg from '../assets/paper.svg'
import rockSvg from '../assets/rock.svg'
import scissorSvg from '../assets/scissor.svg'
import goldenUser from '../assets/goldenUser.svg'

const Player1 = ({ result }) => {
  const { option, score } = useSockets();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(result.showResult);
  }, [result.showResult]);

  return (
    <div className='player_1'>
      <div className="score">
        <div className="personIcon">
          <img src={goldenUser} alt="You" />
        </div>
        <div className="stars">
          {[...Array(3).keys()].map((_, index) => (
            <FaStar key={index} color={index + 1 <= score ? 'gold' : 'white'} size='3rem' />
          ))}
        </div>
      </div>
      <div className={`yourMove ${animate ? 'animate' : ''}`}>
        {
          !option ? (
            <img src={rockSvg} alt="You" style={size} />
          ) 
          : option === 'rock' ? (
            <img src={rockSvg} alt="You" style={size} />
          )
          : option === 'paper' ? (
            <img src={paperSvg} alt="You" style={size} />
          )
          : option === 'sessiors' && (
           <img src={scissorSvg} alt="You" style={{...size, ...scissorStyle}} />
         )
         }
      </div>
    </div>
  );
};

export default Player1;

const size = {
  width: '23rem',
  marginLeft: '-22px',
};

const scissorStyle = {
  transform: 'rotateY(180deg)'
}