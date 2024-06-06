import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";


function deriveActivePlayer(gameLog) {
  let activePlayer = "X";

  if (gameLog.length>0 && gameLog[0].player === "X") {
    activePlayer = "O";
  } 
  return activePlayer;
}

function App() {
  const [gameLog, setGameLog] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  let activePlayer = deriveActivePlayer(gameLog);

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((prevActivePlayer) => prevActivePlayer === "X" ? "O" : "X");
    
    setGameLog((prevGameLog => {
      let currentPlayer = deriveActivePlayer(prevGameLog);


      const updatedGameLog = [
        { 
          square: 
            { 
              row: rowIndex, 
              col: colIndex
            },
          player: currentPlayer
        }, 
        ...prevGameLog];

      return updatedGameLog;

    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/> 
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </ol>

        <GameBoard onSelectSquare={handleSelectSquare} log={gameLog}/>
      </div>

      <Log log={gameLog}/>

    </main>
  )
}

export default App
