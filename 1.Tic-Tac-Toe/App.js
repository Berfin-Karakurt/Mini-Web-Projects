// This code implements a simple Tic Tac Toe game using React.
// IMPORT REQUIRED MODULES
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faO, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Style.css";

// SQUARE COMPONENT (EACH CELL)
function Square({ currentPlayer, onPlay, gameOver, index, value }) {
  const [isButtonClicked, setIsButtonClicked] = useState(false); // has the button been clicked before?

  function handleClick() {
    // if already clicked, game is over, or cell is filled, do nothing
    if (isButtonClicked || gameOver || value) return;

    onPlay(currentPlayer, index); // notify the parent Board component
    setIsButtonClicked(true); // mark as clicked to prevent re-clicking
  }

  // create X or O icon
  let icon = null;
  if (value === "X") {
    icon = <FontAwesomeIcon icon={faXmark} className="icon-x" />;// X icon
  } else if (value === "O") {
    icon = <FontAwesomeIcon icon={faO} className="icon-o" />;// O icon
  }

  return (
    <button className="Board" onClick={handleClick}>
      {icon}
    </button>
  );
}

// BOARD COMPONENT (3x3 = 9 CELLS)
function Board() {
  const [currentPlayer, setCurrentPlayer] = useState("X"); // current player
  const [xCount, setxCount] = useState(0); // move count for X player
  const [oCount, setoCount] = useState(0); // move count for O player
  const [gameOver, setGameOver] = useState(false); // is the game over?
  const [winner, setWinner] = useState(null); // is there a winner?
  const [boardState, setBoardState] = useState(Array(9).fill(null)); // value of each cell (X, O, or null)

  // function called on each click
  function handlePlay(player, index) {
    if (boardState[index] !== null || gameOver) return; // do nothing if cell is filled or game is over

    const newBoard = [...boardState]; // create a copy of the board
    newBoard[index] = player; // place player's move on clicked cell
    setBoardState(newBoard); // update board state

    const detectedWinner = calculateWinner(newBoard); // check for winner
    if (detectedWinner) {
      setWinner(detectedWinner); // set winner
      setGameOver(true); // end the game
      return;
    }

    // switch current player
    if (player === "X") {
      setxCount(xCount + 1);// increment X player's move count
      setCurrentPlayer("O");
    } else {
      setoCount(oCount + 1);// increment O player's move count
      setCurrentPlayer("X");
    }

    // if all cells are filled and no winner: draw
    if (newBoard.every(cell => cell !== null)) {
      setGameOver(true);
    }
  }

  // function to determine the winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    // check each row/column/diagonal
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // if all three are the same and not null
        return squares[a]; // return "X" or "O"
      }
    }
    return null; // no winner
  }

  // CREATE THE BOARD (3x3 CELLS)
  const rows = []; // list to hold all rows
  for (let i = 0; i < 3; i++) {
    const row = []; // list for current row
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j; // index from 0 to 8

      row.push(
        <Square
          key={index}
          index={index}
          currentPlayer={currentPlayer}
          onPlay={handlePlay}
          gameOver={gameOver}
          value={boardState[index]} // is this cell X, O, or null?
        />
      );
    }

    rows.push(
      <div key={i} className="row">{row}</div> // render each row to the screen
    );
  }

  return (
    <>
      {rows}

      {/* show result if game is over */}
      {winner && (
        <div className="game-over">
          <FontAwesomeIcon
            icon={winner === "X" ? faXmark : faO}
            className={winner === "X" ? "icon-x" : "icon-o"}
          /> wins!
        </div>
      )}

      {/* no winner but all cells are filled → draw */}
      {!winner && gameOver && <div className="game-over">Draw!</div>}
    </>
  );
}

// MAIN APPLICATION COMPONENT
export default function App() {
  return (
    <div className="container">
      <Board />
    </div>
  );
}
// END OF CODE
