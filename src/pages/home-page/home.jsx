import React, { useEffect, useState } from 'react'
import './home.scss'
import { useSockets } from '../../context-providers/socket-hook'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { socket, room, setRoom } = useSockets()
    const navigate = useNavigate()

    useEffect(() => {
        setRoom(null)
    }, [])

    const createRoomHandler = (e) => {
        socket.emit("create:room", {roomId: socket.id, roomType: 'PUBLIC'});
    };
    const createRoomPrivate = (e) => {
        socket.emit("create:room", {roomId: socket.id, roomType: 'PRIVATE'});
    };

    const createBotRoom = () => {
        navigate(`/botRoom`)
    }

    socket.on("room:get", (room) => {
        setRoom(room)
        console.log("room:get:  " + room)

        if(room.private){
            navigate(`/privateRoom/${room.roomId}`)
        } else{
            navigate(`/publicRoom/${room.roomId}`)
        }
        // if(!room.private){
        //     navigate(`/room/${room.roomId}`)
        // }
    });
    
    // useEffect(() => {
    //     socket.on("connect", () => {
    //         console.log("connected", socket.id);
    //     });

    //     socket.on("room:get", (room) => {
    //         setRoom(room)

    //         if(room.private){
    //             navigate(`/privateRoom/${room.roomId}`)
    //         } else{
    //             navigate(`/room/${room.roomId}`)
    //         }
    //     });
        
    // }, []);

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
                    <Button type="submit" variant="contained" color="primary" onClick={() => createRoomPrivate()}>
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