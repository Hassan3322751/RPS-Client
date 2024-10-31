import { useNavigate } from "react-router-dom"

export const getWinner = (option1, option2) => {
  if (option1 === 'rock') {
    switch (option2) {
      case 'paper':
        return 'YOU LOSE'
        case 'sessiors':
          return 'YOU WON'
          default:
            return 'IT IS DRAW'
          }
        } else if (option1 === 'paper') {
          switch (option2) {
          case 'rock':
            return 'YOU WON'
          case 'sessiors':
            return 'YOU LOSE'
            default:
              return 'IT IS DRAW'
            }
          } else {
            switch (option2) {
          case 'rock':
            return 'YOU LOSE'
            case 'paper':
              return 'YOU WON'
              default:
                return 'IT IS DRAW'
              }
            }
          }
          
  export const updateRoom = (room, socket, result, opponent, setScore, setEnemyScore) => {
    let yourScore;

    room.players[socket.id].option = null
    room.players[socket.id].optionLock = false
    room.players[opponent].option = null
    room.players[opponent].optionLock = false
  
    if (result === 'YOU WON') {
      yourScore = room.players[socket.id].score += 1
      room.players[opponent].score = room.players[opponent].score 
      setScore(yourScore)
      socket.emit("room:update", room)
    } 
    else if(result === "IT IS DRAW"){
      yourScore = room.players[socket.id].score
      room.players[opponent].score = room.players[opponent].score 
      setScore(yourScore)
      socket.emit("room:update", room)
    } 
    else{
      setEnemyScore(room.players[opponent].score += 1)
    }

    // if(yourScore >= 3){
    //   alert("You Won")
    //   window.location.replace('http://localhost:5173')
    // }
  }