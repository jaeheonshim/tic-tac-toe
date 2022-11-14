import "./Board.css"

export default function Board({ board, onClick, boardRef }) {
    return (
        <div ref={boardRef} className="board">
            <div className="row">
                <div className="cell br bb" onClick={() => onClick(0, 0)}>
                    {board[0][0] == 1 && <div className="x"></div>}{board[0][0] == -1 && <div className="o"></div>}
                </div>
                <div className="cell bl br bb" onClick={() => onClick(0, 1)}>
                    {board[0][1] == 1 && <div className="x"></div>}{board[0][1] == -1 && <div className="o"></div>}
                </div>
                <div className="cell bl bb" onClick={() => onClick(0, 2)}>
                    {board[0][2] == 1 && <div className="x"></div>}{board[0][2] == -1 && <div className="o"></div>}
                </div>
            </div>
            <div className="row">
                <div className="cell bt br bb" onClick={() => onClick(1, 0)}>
                    {board[1][0] == 1 && <div className="x"></div>}{board[1][0] == -1 && <div className="o"></div>}
                </div>
                <div className="cell bt br bb bl" onClick={() => onClick(1, 1)}>
                    {board[1][1] == 1 && <div className="x"></div>}{board[1][1] == -1 && <div className="o"></div>}
                </div>
                <div className="cell bt bb bl" onClick={() => onClick(1, 2)}>
                    {board[1][2] == 1 && <div className="x"></div>}{board[1][2] == -1 && <div className="o"></div>}
                </div>
            </div>
            <div className="row">
                <div className="cell bt br" onClick={() => onClick(2, 0)}>
                    {board[2][0] == 1 && <div className="x"></div>}{board[2][0] == -1 && <div className="o"></div>}
                </div>
                <div className="cell bt br bl" onClick={() => onClick(2, 1)}>
                    {board[2][1] == 1 && <div className="x"></div>}{board[2][1] == -1 && <div className="o"></div>}
                </div>
                <div className="cell bt bl" onClick={() => onClick(2, 2)}>
                    {board[2][2] == 1 && <div className="x"></div>}{board[2][2] == -1 && <div className="o"></div>}
                </div>
            </div>
        </div>
    )
}