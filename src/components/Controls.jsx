import React, { useEffect, useState } from 'react'
import { useSockets } from '../context-providers/socket-hook'
import { Button } from '@mui/material'

import '../pages/room-screen/room.scss'

const Controls = () => {
  const {room, socket, setOption} = useSockets()
  
  // const lockControls = room.players[socket.id].optionLock
  const lockControls = false

  useEffect(() => {
    if(room.players[socket.id].optionLock){
      setOption(room.players[socket.id].option)
    } else{
      setOption("")
    }
  }, [room])

  const handleChange = (e) => {
    room.players[socket.id].option = e.target.value
    room.players[socket.id].optionLock = true
    socket.emit("room:update", room)
  }

  return (
    <>
      <Button value='rock' style={style} disabled={lockControls} onClick={(e) => handleChange(e)}>
        <img src="/rockButton.png" alt="rock" title='Rock' />
      </Button>
      <Button value='paper' style={style} disabled={lockControls} onClick={(e) => handleChange(e)}>
        <img src="/paperButton.png" alt="paper" title='Paper' />
      </Button>
      <Button value='sessiors' style={style} disabled={lockControls} onClick={(e) => handleChange(e)}>
        <img src="/scissorsButton.png" alt="scissor" title='Scissor' />
      </Button>
    </>
  )
}

export default Controls

const style = {
  backgroundColor: 'skyblue'
}