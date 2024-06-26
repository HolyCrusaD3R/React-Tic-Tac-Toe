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

function deriveGameBoard(gameLog) {
  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];

  for(const turn of gameLog) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && (firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol)) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveActivePlayer(gameLog) {
  let activePlayer = "X";

  if (gameLog.length>0 && gameLog[0].player === "X") {
    activePlayer = "O";
  } 
  return activePlayer;
}

function App() {
  const [gameLog, setGameLog] = useState([]);
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });

  let activePlayer = deriveActivePlayer(gameLog);
  let gameBoard = deriveGameBoard(gameLog);

  
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameLog.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
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

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}/> 
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} log={gameLog} gameBoard={gameBoard}/>
      </div>

      <Log log={gameLog}/>

    </main>
  )
}

export default App