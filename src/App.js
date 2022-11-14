import { useRef, useState } from 'react';
import Board from './Board';
import shake from './util/shake';
import "./App.css"
import { getWinner, toPlay } from './board/boardutil';
import { minimax } from './board/AI';

const StatusTexts = {
  X_PLAY: "X to play",
  O_PLAY: "O to play",
  X_WINS: "X wins!",
  O_WINS: "O wins!",
  DRAW: "Draw!"
}

function App() {
  const boardRef = useRef(null);

  const [statusText, setStatusText] = useState(StatusTexts.X_PLAY)
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);

  const place = (r, c, player) => {
    const newBoard = [[...board[0]], [...board[1]], [...board[2]]];
    newBoard[r][c] = player;
    setBoard(newBoard);

    const winner = getWinner(newBoard);
    const play = toPlay(newBoard);

    if(winner === 1) {
      setStatusText(StatusTexts.X_WINS);
    } else if(winner === -1) {
      setStatusText(StatusTexts.O_WINS);
    } else if(winner) {
      setStatusText(StatusTexts.DRAW);
    } else if(play === 1) {
      setStatusText(StatusTexts.X_PLAY);
    } else if(play === -1) {
      setStatusText(StatusTexts.O_PLAY);
    }

    console.log(minimax(newBoard, play === 1));
  }

  const onBoardClick = (r, c) => {
    if(getWinner(board)) return;

    if(board[r][c] == 0) {
      place(r, c, toPlay(board));
    } else {
      shake(boardRef.current);
    }
  };

  return (
    <div className="App">
      <Board boardRef={boardRef} board={board} onClick={onBoardClick} />
      <div id="status-text">{statusText}</div>
    </div>
  );
}

export default App;
