export function getWinner(board) {
    for (let i = 0; i < 3; ++i) {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][2] != 0 && board[i][2] % 2 != 0) return board[i][0]; // check column
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[2][i] != 0 && board[2][i] % 2 != 0) return board[0][i];
    }

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[2][2] != 0 && board[2][2] % 2 != 0) return board[0][0];
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[2][0] != 0 && board[2][0] % 2 != 0) return board[0][2];

    const reduce = (l) => l.reduce((p, c) => p + ((c == 1 || c == -1) ? 1 : 0), 0);
    const sum = reduce(board[0]) + reduce(board[1]) + reduce(board[2]);

    if (sum == 9) return true;

    return false;
}

// ONLY WORKS IF VALID PLAY IS FOLLOWED
export function toPlay(board) {
    const reduce = (l) => l.reduce((p, c) => p + ((c == 1 || c == -1) ? c : 0), 0);
    const sum = reduce(board[0]) + reduce(board[1]) + reduce(board[2]);
    return 1 + 2 * -sum;
}