import { useEffect, useMemo, useReducer, useState } from 'react';
import './room.scss';

import { getWinner, updateRoom } from '../../configs/configs';
import Player1 from '../../components/Player1';
import Player2 from '../../components/Player2';
import Controls from '../../components/Controls';
import VoiceCall from '../../components/VoiceCall/audioStream';
import { useSockets } from '../../context-providers/socket-hook';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultBoard from '../../components/ResultBoard/ResultBoard.jsx';

import Loose from '../../assets/win.png'

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
  const [opponent, setOpponent] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [result, setResult] = useState(null)
  const [resultScore, setResultScore] = useState(0)
 
  const location = useNavigate();
  const isPrivate = window.location.href.split("/")[3].includes('private');
  const roomId = window.location.href.split('/')[4].split("?")[0];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const toJoin = params.get('join');
    
    if (isPrivate && toJoin) {
      socket.emit('create:room', { roomId, roomType });
    }

    socket.on("room:unavailable", (data) => {
      return (
        <div>Room Is Unavailable or Full.</div>
      )
    });

    socket.on('room:get', (receivedRoom) => {
      if (!receivedRoom) return;
      setRoom(receivedRoom);

      const opponentId = Object.keys(receivedRoom.players).find((id) => id !== socket.id);
      setOpponent(opponentId)
      const option1 = receivedRoom.players[socket.id]?.option;
      const option2 = opponentId ? receivedRoom.players[opponentId]?.option : null;

      if (option1 && option2) {
        dispatch({ type: 'SET_OPTIONS', option1, option2 });

        setTimeout(() => {
          dispatch({ type: 'HIDE_RESULT', opponent: opponentId });
          setOption(option1);
          setOption2(option2);

          const winner = getWinner(option1, option2);
          let status = updateRoom(receivedRoom, socket, winner, opponentId, setScore, setEnemyScore);
          
          setTimeout(() => {
            setOption('rock');
            setOption2('rock');
          }, 1500);

          setResult(status)
        }, 1900);
      }
    });
    
    socket.on("game:result", (payload) => {
      let yourScore = payload.players[socket.id]?.score
      setResultScore(yourScore)
      setModalOpen(true)
    })

    return () => {
      socket.off('room:get');
      socket.off('game:result');
      socket.off('connect');
      socket.disconnect()
    };
  }, []);

  const handleBeforeUnload = (event) => {
    alert(event)
    // Custom message for the confirmation dialog
    const confirmationMessage = 'Are you sure you want to leave this game?';
    event.returnValue = confirmationMessage; // For modern browsers
    return confirmationMessage; // For older browsers
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);

    window.addEventListener('popstate', () => {
      const confirmLeave = window.confirm("Are you sure you want to leave the game?");
      if (!confirmLeave) {
        window.history.pushState(null, null, window.location.href);
      } else{
        window.removeEventListener('popstate', handleBeforeUnload);
        location('/')
      }
    });

    // return () => {
    // };
  }, []);


  if (!room) {
    return <div>Loading room...</div>;
  }

  return (
    <div className="game-container">
      <div className="game-body">
        <div className="playersInfo">
          <Player1 result={state} />
          {/* <img src={Loose} alt='Loose / Win' /> */}
          <Player2 result={state} />
        </div>
        <div className="controls">
          {Object.keys(room.players).length > 1 && <Controls />}
          {<VoiceCall 
            participantId={opponent}
          />}
        </div>
      </div>
      
      {modalOpen && 
        <div className="resultModal" style={{
          borderRadius: '4px',
          width: '100%',
          height: '67%',
          position: 'fixed',
          zIndex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#adadad73',
          backdropFilter: 'blur(5px)',
        }}>
          <ResultBoard result={result} score={resultScore} />
        </div>
      }
    </div>

  );
};

export default Game;