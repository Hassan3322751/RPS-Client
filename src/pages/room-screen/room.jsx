import React, { useEffect, useReducer, useRef, useState } from 'react';
import './room.scss';

import { getWinner, updateRoom } from '../../configs/configs';
import Player1 from '../../components/Player1';
import Player2 from '../../components/Player2';
import Controls from '../../components/Controls';
import VoiceCall from '../../components/VoiceCall/audioStream';
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
  const [opponent, setOpponent] = useState()

  const location = useLocation();
  const isPrivate = window.location.href.split("/")[3].includes('private');
  const roomId = window.location.href.split('/')[4].split("?")[0];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const toJoin = params.get('join');

    if (isPrivate && toJoin) {
      socket.emit('create:room', { roomId, roomType });
    }

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
          updateRoom(receivedRoom, socket, winner, opponentId, setScore, setEnemyScore);

          setTimeout(() => {
            setOption('rock');
            setOption2('rock');
          }, 1500);
        }, 1900);
      }
    });

    return () => {
      socket.off('room:get');
      socket.off('connect');
    };
  }, []);


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
          {<VoiceCall 
            participantId={opponent}
          />}
        </div>
      </div>
    </div>
  );
};

export default Game;