import { useRef, useState } from 'react';
import Board from './Board';
import shake from './util/shake';

function App() {
  const boardRef = useRef(null);

  const [board, setBoard] = useState([
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);

  const toPlay = (board) => {
    const reduce = (l) => l.reduce((p, c) => p + c, 0);
    const sum = reduce(board[0]) + reduce(board[1]) + reduce(board[2]);
    return 1 + 2 * -sum;
  }

  const place = (r, c, player) => {
    const newBoard = [[...board[0]], [...board[1]], [...board[2]]];
    newBoard[r][c] = player;
    setBoard(newBoard);
  }

  const onBoardClick = (r, c) => {
    if(board[r][c] == 0) {
      place(r, c, toPlay(board));
    } else {
      shake(boardRef.current);
    }
  };

  return (
    <div className="App">
      <Board boardRef={boardRef} board={board} onClick={onBoardClick} />
    </div>
  );
}

export default App;
