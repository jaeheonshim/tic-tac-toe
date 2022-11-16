import { getWinner, toPlay } from "./boardutil";

// X always maximizes, O always minimizes

const minimax = (board, maximizing, boardPath = null, alpha = -Infinity, beta = Infinity, depth = 0) => {
    const winner = getWinner(board);
    if(winner) {
        if(winner === 1 || winner === -1) return { // '===' very important lol
            score: winner,
            depth: depth,
            boardPath: boardPath
        }
        else return {
            score: 0,
            depth: depth,
            boardPath: boardPath
        }
    }

    let extrema = maximizing ? -Infinity : Infinity;
    let extremeResult = null;
        
    for(let r = 0; r < 3; ++r) {
        for(let c = 0; c < 3; ++c) {
            if(board[r][c] === 1 || board[r][c] === -1) continue;

            const temp = board[r][c];
            board[r][c] = maximizing ? 1 : -1;
            const result = minimax(board, !maximizing, boardPath && [...boardPath, JSON.parse(JSON.stringify(board))], alpha, beta, depth + 1);
            const score = result.score;
            board[r][c] = temp;

            if(maximizing) {
                if(score > extrema || (score >= extrema && result.depth < extremeResult.depth)) {
                    alpha = score;
                    extrema = score;
                    extremeResult = result;
                    if(beta <= score) break;
                }
            } else {
                if(score < extrema || (score <= extrema && result.depth < extremeResult.depth)) {
                    beta = score;
                    extrema = score;
                    extremeResult = result;
                    if(score <= alpha) break;
                }
            }
        }
    }

    return extremeResult;
}

const evalBoard = (board, path = null) => {
    return minimax(board, toPlay(board) == 1, path);
}

const evalPossibleMoves = (board) => {
    const possibleMoves = [];
    const play = toPlay(board);
 
    for(let r = 0; r < 3; ++r) {
        for(let c = 0; c < 3; ++c) {
            if(board[r][c] === 1 || board[r][c] === -1) continue;

            const temp = board[r][c];
            board[r][c] = play;
            const result = evalBoard(board, [JSON.parse(JSON.stringify(board))]);
            board[r][c] = temp;

            possibleMoves.push({
                r: r,
                c: c,
                ...result
            })
        }
    }

    return possibleMoves;
}

const evalBestMove = (board) => {
    const possibleMoves = evalPossibleMoves(board);
    const play = toPlay(board);
    
    const scores = possibleMoves.map(m => m.score);
    const bestOutcome = play == 1 ? Math.max(...scores) : Math.min(...scores);

    let bestMove = possibleMoves[0];

    // if best we can do is a loss, take the longest path there
    if(play == 1 && bestOutcome == -1 || play == -1 && bestOutcome == 1) {
        console.log("Failure state")
        for(const move of possibleMoves) {
            if(move.depth > bestMove.depth) {
                bestMove = move;
            }
        }

        return bestMove;
    }

    for(const move of possibleMoves) {
        if((play == 1 && (move.score > bestMove.score || (move.score >= bestMove.score && move.depth < bestMove.depth)))
        || (play == -1 && (move.score < bestMove.score || (move.score <= bestMove.score && move.depth < bestMove.depth)))) {
            bestMove = move;
        }
    }

    return bestMove;
}

export {minimax, evalBoard, evalPossibleMoves, evalBestMove}