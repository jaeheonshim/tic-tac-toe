import "./Board.css"

export default function Board() {
    return (
        <div className="board">
            <div className="row">
                <div className="cell br bb"></div>
                <div className="cell bl br bb"></div>
                <div className="cell bl bb"></div>
            </div>
            <div className="row">
                <div className="cell bt br bb"></div>
                <div className="cell bt br bb bl"></div>
                <div className="cell bt bb bl"></div>
            </div>
            <div className="row">
                <div className="cell bt br"></div>
                <div className="cell bt br bl"></div>
                <div className="cell bt bl"></div>
            </div>
        </div>
        )
    }