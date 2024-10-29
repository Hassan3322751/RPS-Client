import React, { useEffect, useState } from 'react'
import { useSockets } from '../context-providers/socket-hook'
import { Button } from '@mui/material'

import '../pages/room-screen/room.scss'
import zIndex from '@mui/material/styles/zIndex'

const Controls = () => {
  const {room, socket, setOption} = useSockets()
  
  const lockControls = room.players[socket.id].optionLock

  useEffect(() => {
    if(room.players[socket.id].optionLock){
      setOption(room.players[socket.id].option)
    } else{
      setOption("rock")
    }
  }, [room])
  
  const handleChange = (e) => {
    room.players[socket.id].option = e
    room.players[socket.id].optionLock = true
    socket.emit("room:update", room)
  }

  return (
    <>
      <Button style={style} disabled={lockControls} onClick={(e) => handleChange('rock')}>
        <img src="/rockButton.png" alt="rock" title='Rock' />
      </Button>
      <Button style={style} disabled={lockControls} onClick={(e) => handleChange('paper')}>
        <img src="/paperButton.png" alt="paper" title='Paper' />
      </Button>
      <Button style={style} disabled={lockControls} onClick={(e) => handleChange('sessiors')}>
        <img src="/scissorsButton.png" alt="scissor" title='Scissor' />
      </Button>
    </>
  )
}

export default Controls

const style = {
  backgroundColor: 'black',
  zIndex: '1'
}