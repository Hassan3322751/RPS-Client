import React, { useEffect, useReducer } from 'react';
import './room.scss';

import { getWinner, updateRoom } from '../../configs/configs';
import Player1 from '../../components/Player1';
import Player2 from '../../components/Player2';
import Controls from '../../components/Controls';
import { useSockets } from '../../context-providers/socket-hook';
import { useLocation } from 'react-router-dom';

const initialState = {
  showResult: false,
  reset: false,
  opponent: null,
  option1: null,
  option2: null,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_OPTIONS':
      return { ...state, option1: action.option1, option2: action.option2, showResult: true };
    case 'HIDE_RESULT':
      return { ...state, showResult: false, reset: true, opponent: action.opponent };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const Game = ({ roomType }) => {
  const { room, setRoom, socket, setOption, setOption2, setScore, setEnemyScore } = useSockets();
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const location = useLocation();
  let isPrivate = window.location.href.split("/")[3].includes('private')
  let roomId = window.location.href.split('/')[4].split("?")[0];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const toJoin = params.get('join');
    
    console.log("to Join: " + toJoin)
    
    if(isPrivate && toJoin){
      console.log("isPrivate " + isPrivate)
      socket.emit('create:room', { roomId, roomType});
    }

// if (socket.connected) {
//   socket.emit('create:room', { roomId,  });
// } else {
//   socket.on('connect', () => {
//     socket.emit('create:room', { roomId,  });
//   });
// }
    
    socket.on('room:get', (receivedRoom) => {
      if (!receivedRoom) return;
      console.log(receivedRoom)

      setRoom(receivedRoom);

      const opponentId = Object.keys(receivedRoom.players).find((id) => id !== socket.id);
      const option1 = receivedRoom.players[socket.id]?.option;
      const option2 = opponentId ? receivedRoom.players[opponentId]?.option : null;

      if (option1 && option2) {
        dispatch({ type: 'SET_OPTIONS', option1, option2 });
        
        setTimeout(() => {
          dispatch({ type: 'HIDE_RESULT', opponent: opponentId });
          setOption(option1);
          setOption2(option2);
          
          const winner = getWinner(option1, option2);
          updateRoom(receivedRoom, socket, winner, opponentId, setScore, setEnemyScore);

          setTimeout(() => {
            setOption('rock');
            setOption2('rock');
          }, 1500);
        }, 1900);
      }
    });

    // Clean up listeners on unmount
    return () => {
      socket.off('room:get');
      socket.off('connect');
    };
  }, [location]);

  if (!room) {
    return <div>Loading room...</div>;
  }

  return (
    <div className="game-container">
      <div className="game-body">
        <div className="playersInfo">
          <Player1 result={state} />
          <Player2 result={state} />
        </div>
        <div className="controls">
          {Object.keys(room.players).length > 1 && <Controls />}
        </div>
      </div>
    </div>
  );
};
export default Game;



// import React, { useEffect, useReducer } from 'react';
// import './room.scss';

// import { getWinner, updateRoom } from '../../configs/configs';
// import Player1 from '../../components/Player1';
// import Player2 from '../../components/Player2';
// import Controls from '../../components/Controls';
// import { useSockets } from '../../context-providers/socket-hook';

// const initialState = {
//   showResult: false,
//   reset: false,
//   opponent: null,
//   option1: null,
//   option2: null,
// };

// const gameReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_OPTIONS':
//       return { ...state, option1: action.option1, option2: action.option2, showResult: true };
//     case 'HIDE_RESULT':
//       return { ...state, showResult: false, reset: true, opponent: action.opponent };
//     case 'RESET':
//       return initialState;
//     default:
//       return state;
//   }
// };

// const Game = ({ roomType }) => {
//   const { room, socket, setOption, setOption2, setScore, setEnemyScore } = useSockets();
//   const [state, dispatch] = useReducer(gameReducer, initialState);
//   // console.log(room, socket)
//   // let player2 = Object.values(room.players)[1]
//   let isPrivate = window.location.href.split("/")[3].includes('private');
//   let roomID = window.location.href.split("/")[4];
  
//   let player2 = !roomType && isPrivate ? true : Object.values(room.players)[1]

  
//   useEffect(() => {

//     socket.on("room:get", (room) => {
//       if(!roomType && isPrivate){
//         socket.emit("create:room", {roomId: roomID, roomType: 'private'})
//       }
      
//       const opponentId = Object.keys(room.players).find((id) => id !== socket.id);
//       const option1 = room.players[socket.id]?.option;
//       const option2 = opponentId ? room.players[opponentId]?.option : null;

//       if (option1 && option2) {
//         dispatch({ type: 'SET_OPTIONS', option1, option2 });

//         setTimeout(() => {
//           dispatch({ type: 'HIDE_RESULT', opponent: opponentId });

//           setOption(option1);
//           setOption2(option2);

//           const winner = getWinner(option1, option2);
//           updateRoom(room, socket, winner, opponentId, setScore, setEnemyScore);

//           setTimeout(() => {
//             setOption("rock")
//             setOption2("rock")
//           }, 1500);
//         }, 1900);
//       }
//     });
//   }, []);

//   return (
//     <div className='game-container'>
//       <div className="game-body">
//         <div className="playersInfo">
//           <Player1 result={state} />
//           <Player2 result={state} />
//         </div>
//         <div className="controls">
//           {player2 && <Controls />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Game;




// import React, { useEffect, useState } from 'react'
// import './room.scss'
// import { getWinner, updateRoom } from '../../configs/configs'

// import Player1 from '../../components/Player1'
// import Player2 from '../../components/Player2'
// import Controls from '../../components/Controls'
// import { useSockets } from '../../context-providers/socket-hook'

// const Game = ({roomType}) => {
//   const {room, socket, setOption, setOption2, setScore, setEnemyScore} = useSockets()
//   let player2 = Object.values(room.players)[1]
  
//   const [result, setResult] = useState({
//     show: false,
//     reset: false,
//     enemy: null
//   })

//   useEffect(() => {
//     socket.on("room:get", (room) => {
//       let opponent;
      
//       Object.keys(room.players).filter((id, index) => {
//         let oppId = id != socket.id
//         if(oppId){
//           opponent = Object.keys(room.players)[index]
//         }
//         return
//       })
      
//       if(room.players[socket.id].score >= 3){
//         alert("You Won")
//       } else if(room.players[opponent].score >= 3){
//         alert("You Loose")
//       }

//       let option1 = room.players[socket.id].option
//       let option2 = opponent ? room.players[opponent].option : null
      
//       if(option1 && option2){
//         setResult({...result, show: true})
        
//         setTimeout(() => {
//           setResult({...result, show: false, reset: true, enemy: opponent})
          
//           setOption(option1)
//           setOption2(option2)
          
//           let winner = getWinner(option1, option2)
//           updateRoom(room, socket, winner, opponent, setScore, setEnemyScore)
//         }, 1900)

//         setTimeout(() => {
//           setResult({...result, reset: true})
//         }, 2900)
//     }
//   })
// }, [])
  
//   return (
//     <div className='game-container'>
//         <div className="game-body">
//           <div className="playersInfo">
//               <Player1 result={result} />
//               <Player2 result={result} />
//           </div>
          
//           <div className="controls">
//             {
//               player2 && (
//                 <Controls />
//               )
//             }
//           </div>
//         </div>
//     </div>
//   )
// }

// export default Game