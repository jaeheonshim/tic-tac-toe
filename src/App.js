import { useRef, useState } from 'react';
import Board from './Board';
import shake from './util/shake';
import "./App.css"

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

  const toPlay = (board) => {
    const reduce = (l) => l.reduce((p, c) => p + c, 0);
    const sum = reduce(board[0]) + reduce(board[1]) + reduce(board[2]);
    return 1 + 2 * -sum;
  }

  const getWinner = (board) => {
    for(let i = 0; i < 3; ++i) {
      if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][2] != 0) return board[i][0]; // check column
      if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[2][i] != 0) return board[0][i];
    }

    if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[2][2] != 0) return board[0][0];
    if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[2][0] != 0) return board[0][2];

    const reduce = (l) => l.reduce((p, c) => p + c, 0);
    const sum = reduce(board[0]) + reduce(board[1]) + reduce(board[2]);

    if(sum == 9) return true;

    return false;
  }

  const place = (r, c, player) => {
    const newBoard = [[...board[0]], [...board[1]], [...board[2]]];
    newBoard[r][c] = player;
    setBoard(newBoard);

    const winner = getWinner(newBoard);
    const play = toPlay(newBoard);

    if(winner && winner == 1) {
      setStatusText(StatusTexts.X_WINS);
    } else if(winner && winner == -1) {
      setStatusText(StatusTexts.O_WINS);
    } else if(winner) {
      setStatusText(StatusTexts.DRAW);
    } else if(play == 1) {
      setStatusText(StatusTexts.X_PLAY);
    } else if(play == -1) {
      setStatusText(StatusTexts.O_PLAY);
    }
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
