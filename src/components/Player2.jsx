import { useEffect, useState } from 'react';
import '../pages/room-screen/room.scss';
import { useSockets } from '../context-providers/socket-hook';
import { FaStar } from 'react-icons/fa6';
import Waiting from './waiting/Waiting.jsx';

import paperSvg from '../assets/paper.svg'
import rockSvg from '../assets/rock.svg'
import scissorSvg from '../assets/scissor.svg'
import redUser from "../assets/redUser.svg"

const Player2 = ({ result }) => {
  const { room, option2, setScore, enemyScore, setEnemyScore } = useSockets();
  const [animate, setAnimate] = useState(false);
  const player2 = Object.values(room.players)[1];

  !player2 && setScore(0)
  !player2 && setEnemyScore(0)

  useEffect(() => {
    setAnimate(result.showResult);
  }, [result.showResult]);

  return (
    <div className='player_2'>
      {!player2 ? (
        <Waiting />
      ) : (
        <>
          <div className="score enemy">
            <div className="stars">
              {[...Array(3).keys()].map((_, index) => (
                <FaStar key={index} color={index + 1 <= enemyScore ? 'red' : 'white'} size='3rem' />
              ))}
            </div>
            <div className="personIcon">
              <img src={redUser} alt="Opponent" />
            </div>
          </div>
          <div className={`yourMove enemyMove ${animate ? 'animate' : ''}`}>
              {option2 === 'rock' && (
                <img src={rockSvg} alt="You" style={{...size, ...flip}} />
              )}
              {option2 === 'paper' && (
                <img src={paperSvg} alt="You" style={{...size, ...flip}} />
              )}
              {option2 === 'sessiors' && (
                <img src={scissorSvg} alt="You" style={size} />
              )}
            </div>
        </>
      )}
    </div>
  );
};

export default Player2;

const size = {
  width: '23rem',
  marginLeft: '-22px',
};

const flip = {
  transform: 'rotateY(-180deg)'
}