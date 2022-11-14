import { useEffect, useRef, useState } from 'react';
import Board from './Board';
import shake from './util/shake';
import "./App.css"
import { getWinner, toPlay } from './board/boardutil';
import { evalBestMove, evalBoard, minimax } from './board/AI';

const StatusTexts = {
  X_PLAY: "X to play",
  O_PLAY: "O to play",
  X_WINS: "X wins!",
  O_WINS: "O wins!",
  DRAW: "Draw!"
}

function App() {
  const boardRef = useRef(null);

  const [options, setOptions] = useState({
    aiEvaluation: true,
    showBestMove: true
  });

  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [statusText, setStatusText] = useState(StatusTexts.X_PLAY);
  const [evalText, setEvalText] = useState(getEvalText(evalBoard(board), toPlay(board)));

  useEffect(() => {
    const newBoard = [[...board[0]], [...board[1]], [...board[2]]];
    hintBestMove(newBoard, 1);
  }, []);

  function getEvalText(outcome, play) {
    if(outcome.score === 1 || outcome.score === -1) {
      if(play == 1) {
        return `X ${outcome.score === 1 ? "wins" : "loses"} in ${outcome.depth} moves`;
      } else {
        return `O ${outcome.score === 1 ? "loses" : "wins"} in ${outcome.depth} moves`;
      }
    } else {
      if(play == 1) {
        return `X draws in ${outcome.depth} moves`;
      } else {
        return `O draws in ${outcome.depth} moves`;
      }
    }
  }

  function hintBestMove(board, toPlay) {
    const bestMove = evalBestMove(board);
    board[bestMove.r][bestMove.c] = toPlay * 2;

    setBoard(board);
  }

  function place(r, c, player) {
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

    setEvalText(getEvalText(evalBoard(newBoard), play));
    hintBestMove(newBoard, play);
  }

  const onBoardClick = (r, c) => {
    if(getWinner(board)) return;

    if(board[r][c] == 0 || board[r][c] % 2 == 0) {
      place(r, c, toPlay(board));
    } else {
      shake(boardRef.current);
    }
  };

  return (
    <div className="App">
      <div className="bubble-text" style={{fontSize: "1.5em"}}>{statusText}</div>
      <Board style={{width: "40vw", height: "40vw"}} boardRef={boardRef} board={board} onClick={onBoardClick} hints={options.showBestMove} />
      {options.aiEvaluation && <div className="bubble-text">Given optimal play, <b>{evalText}</b></div>}
      <div>

      </div>
    </div>
  );
}

export default App;
