import React, { useEffect, useState } from 'react';
import '../pages/room-screen/room.scss';
import { useSockets } from '../context-providers/socket-hook';
import { FaStar } from 'react-icons/fa6';
import Waiting from './waiting/Waiting';

const Player2 = ({ result }) => {
  const { room, option2, setOption2, enemyScore } = useSockets();
  const [animate, setAnimate] = useState(false);
  const player2 = Object.values(room.players)[1];

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
              <img src="/redUser.png" alt="Opponent" />
            </div>
          </div>
          <div className={`yourMove enemyMove ${animate ? 'animate' : ''}`}>
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



// import React, { useEffect, useState } from 'react'
// import '../pages/room-screen/room.scss'

// import { useSockets } from '../context-providers/socket-hook'
// import { FaStar } from 'react-icons/fa6'
// import Waiting from './waiting/Waiting'

// const Player2 = ({result}) => {
//   const { room, option2, setOption2, enemyScore} = useSockets()
//   const [animate, setAnimate] = useState(false);
  
//   let player2 = Object.values(room.players)[1]

//   useEffect(() => {
//     if(result.show){
//       setAnimate(true)
//     } else{
//       setAnimate(false)
//       // setTimeout(() => {
//         //   setOption2("rock")
//         // }, 1500)
//     }
//       result.reset && setOption2("rock")
//   }, [result])
  
//   return (
//     <div className='player_2'>
//       {
//         !player2 ? (
//           <Waiting />
//         ) : (
//           <>
//             <div className="score enemy">
//               <div className="stars">
//                 {[...Array(3).keys()].map((ele, index) =>
//                   index + 1 <= enemyScore ? (
//                     <FaStar key={index} color='red' size='3rem' />
//                   ) : (
//                     <FaStar key={index} color='white' size='3rem' />
//                   )
//                 )}
//               </div>

//               <div className="personIcon">
//                 <img src="/redUser.png" alt="You" />
//               </div>
//             </div>

            // <div className={`yourMove enemyMove ${animate ? 'animate' : ''}`}>
            //   {option2 === 'rock' && (
            //     <img src="/rock.png" alt="You" style={{...size, ...flip}} />
            //   )}
            //   {option2 === 'paper' && (
            //     <img src="/paper.png" alt="You" style={{...size, ...flip}} />
            //   )}
            //   {option2 === 'sessiors' && (
            //     <img src="/scissors.png" alt="You" style={size} />
            //   )}
            // </div>
//           </>
//         )
//       }
//     </div>
//   )
// }

// export default Player2

// const size = {
//   width: '23rem',
//   marginLeft: '-22px'
// }

// const flip = {
//   transform: 'rotateY(-180deg)'
// }