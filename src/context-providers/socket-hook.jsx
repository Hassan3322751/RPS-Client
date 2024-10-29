import { createContext, useContext, useMemo, useState } from "react";
import { io } from "socket.io-client";

const Sockets = createContext(null)

export default function SocketsProvider({children}) {
    const socket = useMemo(
        () =>
          io("http://localhost:3000", {
            withCredentials: true,
          }),
        []
    );
    const [room, setRoom] = useState(null)
    const [option, setOption] = useState("rock")
    const [option2, setOption2] = useState("rock")
    const [score, setScore] = useState(0);
    const [enemyScore, setEnemyScore] = useState(0);

    return (
        <Sockets.Provider value={ {
            socket, room, setRoom, option, setOption, option2, setOption2, score, setScore, enemyScore, setEnemyScore
        }}>
            {children}
        </Sockets.Provider>
    )
}

export const useSockets = () => useContext(Sockets)