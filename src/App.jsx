import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];


function deriveActivePlayer(gameLog) {
  let activePlayer = "X";

  if (gameLog.length>0 && gameLog[0].player === "X") {
    activePlayer = "O";
  } 
  return activePlayer;
}

function App() {
  const [gameLog, setGameLog] = useState([]);

  let activePlayer = deriveActivePlayer(gameLog);


  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];

  for(const turn of gameLog) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }

  let winner = null;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && (firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol)) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameLog.length === 9 && !winner;

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

  function handleRestart() {
    setGameLog([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/> 
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} log={gameLog} gameBoard={gameBoard}/>
      </div>

      <Log log={gameLog}/>

    </main>
  )
}

export default App
