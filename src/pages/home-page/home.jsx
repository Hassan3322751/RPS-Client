import { useEffect } from 'react'
import './home.scss'
import { useSockets } from '../../context-providers/socket-hook'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { socket, setRoom, setScore, setEnemyScore } = useSockets()
    const navigate = useNavigate()

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
            console.log('Socket reconnected.'); // Optional: Log reconnect status
        }
        setRoom(null)
        setScore(0)
        setEnemyScore(0)
    }, [])

    const createRoomHandler = () => {
        socket.emit("create:room", {roomId: null, roomType: 'PUBLIC'});
    };
    const createRoomPrivate = () => {
        socket.emit("create:room", {roomId: null, roomType: 'PRIVATE'});
    };

    const createBotRoom = () => {
        navigate(`/botRoom`)
    }

    socket.on("room:get", (room) => {
        setRoom(room)
        console.log(room)

        if(room.private){
            navigate(`/privateRoom/${room.roomId}`)
        } else{
            navigate(`/publicRoom/${room.roomId}`)
        }
    });

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