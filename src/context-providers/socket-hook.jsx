import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const Sockets = createContext(null)

export default function SocketsProvider({children}) {

    const socket = useMemo(
        () =>
            // io("http://localhost:3000", {
            io("https://5qs267js-3000.inc1.devtunnels.ms", {
                withCredentials: true,
            }),
        []
    );
        
    const [room, setRoom] = useState(null)
    const [option, setOption] = useState("rock")
    const [option2, setOption2] = useState("rock")
    const [score, setScore] = useState(0);
    const [enemyScore, setEnemyScore] = useState(0);
    
    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected", socket.id);
        });

        // socket.on("room:get", (room) => {
        //     setRoom(room)
        //     console.log("room:get:  " + room)

        //     if(room.private){
        //         navigate(`/privateRoom/${room.roomId}`)
        //     } else{
        //         navigate(`/publicRoom/${room.roomId}`)
        //     }
        //     // if(!room.private){
        //     //     navigate(`/room/${room.roomId}`)
        //     // }
        // });
        
    }, []);


    return (
        <Sockets.Provider value={ {
            socket, room, setRoom, option, setOption, option2, setOption2, score, setScore,
            enemyScore, setEnemyScore
        }}>
            {children}
        </Sockets.Provider>
    )
}

export const useSockets = () => useContext(Sockets)