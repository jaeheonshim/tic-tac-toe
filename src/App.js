import { useEffect, useRef, useState } from 'react';
import Board from './Board';
import shake from './util/shake';
import "./App.css"
import { getWinner, toPlay } from './board/boardutil';
import { evalBestMove, evalBoard, evalPossibleMoves, minimax } from './board/AI';
import initialPaths from "./initialPaths.json"

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
    showBestMove: true,
    listPossibleGames: true
  });

  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [statusText, setStatusText] = useState(StatusTexts.X_PLAY);
  const [evalText, setEvalText] = useState(getEvalText(evalBoard(board), toPlay(board)));
  const [possibleGames, setPossibleGames] = useState(playsToJsx(initialPaths));

  useEffect(() => {
    const newBoard = [[...board[0]], [...board[1]], [...board[2]]];

    newBoard[0][0] = 2;
    setBoard(newBoard);
  }, []);

  function getEvalText(outcome, play) {
    if (outcome.score === 1 || outcome.score === -1) {
      if (play == 1) {
        return `X ${outcome.score === 1 ? "wins" : "loses"} in ${outcome.depth} moves`;
      } else {
        return `O ${outcome.score === 1 ? "loses" : "wins"} in ${outcome.depth} moves`;
      }
    } else {
      if (play == 1) {
        return `X draws in ${outcome.depth} moves`;
      } else {
        return `O draws in ${outcome.depth} moves`;
      }
    }
  }

  function hintBestMove(board, play) {
    const bestMove = evalBestMove(board);
    board[bestMove.r][bestMove.c] = play * 2;

    setBoard(board);
  }

  function playsToJsx(plays) {
    return plays.map((play, i) => {
      const boards = play.boardPath.map((board, j) => (
        <Board key={j} style={{ width: "8vw", height: "8vw", fontSize: "5px", margin: 0 }} board={board} hints={true} />
      ));

      let text;
      if(play.score == 1) {
        text = "X wins";
      } else if(play.score == -1) {
        text = "O wins";
      } else {
        text = "Draw";
      }

      return <div>
        {text}
        <div className="board-row" key={i}>
          {boards}
        </div>
      </div>
    });
  }

  async function computeOptimalPlays(board) {
    const plays = evalPossibleMoves(board);
    const play = toPlay(board);

    plays.sort((a, b) => {
      if (play == 1) {
        return b.score - a.score;
      } else {
        return a.score - b.score;
      }
    });

    for (const play of plays) {
      for (const estimatedBoard of play.boardPath) {
        for (let r = 0; r < 3; ++r) {
          for (let c = 0; c < 3; ++c) {
            if (estimatedBoard[r][c] != board[r][c]) {
              estimatedBoard[r][c] *= 2;
            }
          }
        }
      }
    }

    const paths = playsToJsx(plays);

    setPossibleGames(paths);
  }

  function place(r, c, player) {
    const newBoard = [[...board[0]], [...board[1]], [...board[2]]];
    newBoard[r][c] = player;
    setBoard(newBoard);

    const winner = getWinner(newBoard);
    const play = toPlay(newBoard);

    if (winner === 1) {
      setStatusText(StatusTexts.X_WINS);
    } else if (winner === -1) {
      setStatusText(StatusTexts.O_WINS);
    } else if (winner) {
      setStatusText(StatusTexts.DRAW);
    } else if (play === 1) {
      setStatusText(StatusTexts.X_PLAY);
    } else if (play === -1) {
      setStatusText(StatusTexts.O_PLAY);
    }

    if (options.listPossibleGames) {
      computeOptimalPlays(newBoard);
    }

    setEvalText(getEvalText(evalBoard(newBoard), play));
    hintBestMove(newBoard, play);
  }

  const onBoardClick = (r, c) => {
    if (getWinner(board)) return;

    if (board[r][c] == 0 || board[r][c] % 2 == 0) {
      place(r, c, toPlay(board));
    } else {
      shake(boardRef.current);
    }
  };

  return (
    <div className="App">
      <div className="bubble-text" style={{ fontSize: "1.5em" }}>{statusText}</div>
      <Board style={{ width: "40vw", height: "40vw" }} boardRef={boardRef} board={board} onClick={onBoardClick} hints={options.showBestMove} />
      {options.aiEvaluation && <div className="bubble-text">Given optimal play, <b>{evalText}</b></div>}
      {options.listPossibleGames &&
        <div className="possibility-display">
          <h3>Possible Games (optimal play assumed)</h3>
          {possibleGames}
        </div>
      }
    </div>
  );
}

export default App;