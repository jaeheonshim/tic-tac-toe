import { getWinner } from "./boardutil";

// X always maximizes, O always minimizes

const minimax_ABPrune = (board, maximizing, alpha, beta) => {
    const winner = getWinner(board);
    if(winner === 1 || winner === -1) return winner; // '===' very important lol
    if(winner) {
        return 0;
    }

    let extrema = maximizing ? -Infinity : Infinity;
        
    for(let r = 0; r < 3; ++r) {
        for(let c = 0; c < 3; ++c) {
            if(board[r][c] !== 0) continue;

            board[r][c] = maximizing ? 1 : -1;
            const score = minimax(board, !maximizing, alpha, beta);
            board[r][c] = 0;

            if(maximizing) {
                if(score > extrema) {
                    alpha = score;
                    extrema = score;
                    if(beta <= score) break;
                }
            } else {
                if(score < extrema) {
                    beta = score;
                    extrema = score;
                    if(score <= alpha) break;
                }
            }
        }
    }

    return extrema;
}

const minimax = (board, maximizing) => {
    return minimax_ABPrune(board, maximizing, -Infinity, Infinity);
}

export {minimax}