import React, { useEffect, useState } from 'react'
import './home.scss'
import { useSockets } from '../../context-providers/socket-hook'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { socket, setRoom } = useSockets()
    const navigate = useNavigate()

    const createRoomHandler = (e) => {
        socket.emit("create:room", socket.id);
    };

    const createBotRoom = () => {
        navigate(`/botRoom`)
    }

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected", socket.id);
        });

        socket.on("room:get", (room) => {
            setRoom(room)
            navigate(`/room/${room.roomId}`)
        });
        
    }, []);

    return (
        <div className='home'>
            <div className='body'>
                <div className="logo">
                    <h1>ROCK</h1>
                    <h1>PAPER</h1>
                    <h3>SESSIORS</h3>
                </div>

                <div className="actions">
                    <Button type="submit" variant="contained" color="primary" onClick={() => createBotRoom()}>
                        Play with Bot
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={() => createRoomHandler()}>
                        Play with Friend
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={() => createRoomHandler()}>
                        Play with Stranger
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home