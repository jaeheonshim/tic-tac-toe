import "./Board.css"

const classNameArray = [
    ["br bb", "bl br bb", "bl bb"],
    ["bt br bb", "bt br bb bl", "bt bb bl"],
    ["bt br", "bt br bl", "bt bl"]
];

// I wrote this at 1AM don't judge me
export default function Board({ board, onClick, boardRef, hints, style }) {
    const inner = board.map((row, r) => {
        const cols = row.map((cell, c) => (
            <div key={c} className={["cell", classNameArray[r][c]].join(" ")}  onClick={() => onClick(r, c)}>
                {(cell % 2 == 0 && hints || cell % 2 != 0) && cell / Math.abs(cell) == 1 && <div className={"x" + ((cell % 2 == 0) ? " faded" : "")}></div>}{(cell % 2 == 0 && hints || cell % 2 != 0) && cell / Math.abs(cell) == -1 && <div className={"o" + (cell % 2 == 0 ? " faded" : "")}></div>}
            </div>
        ));

        return <div key={r} className="row">
            {cols}
        </div>
    });

    return (
        <div ref={boardRef} style={style} className="board">
            {inner}
        </div>
    )
}