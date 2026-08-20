import { useState } from "react";

function checkWinner(squares) {
    if (squares[0] != null && squares[0] == squares[1] && squares[1] == squares[2]) {
        return squares[0];
    } else if (squares[3] != null && squares[3] == squares[4] && squares[4] == squares[5]) {
        return squares[3];
    } else if (squares[6] != null && squares[6] == squares[7] && squares[7] == squares[8]) {
        return squares[6];
    } else if (squares[0] != null && squares[0] == squares[3] && squares[3] == squares[6]) {
        return squares[0];
    } else if (squares[1] != null && squares[1] == squares[4] && squares[4] == squares[7]) {
        return squares[1];
    } else if (squares[2] != null && squares[2] == squares[5] && squares[5] == squares[8]) {
        return squares[2];
    } else if (squares[0] != null && squares[0] == squares[4] && squares[4] == squares[8]) {
        return squares[0];
    } else if (squares[2] != null && squares[2] == squares[4] && squares[4] == squares[6]) {
        return squares[2];
    } else {
        return null;
    }
}

function Square({ value, handleClick }) {
    return (
        <button className="square" onClick={handleClick}>
            {value}
        </button>
    );
}

function Board({ turn, setTurn, squares, setSquares, history, setHistory }) {

    function handleSquareClick(index) {
        if (squares[index] != null) {
            console.log("Error: this square has already been played");
            return;
        } else if (!turn) {
            console.log("Game is Over!")
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[index] = turn;
        setSquares(nextSquares);
        setHistory([...history, nextSquares]);

        const winner = checkWinner(nextSquares);
        if (winner) {
            document.getElementById("game-status").innerHTML = "Winner: " + winner;
            console.log("Winner:", winner);
            setTurn(null);
            return;
        }

        if (turn == "X") {
            document.getElementById("game-status").innerHTML = "Next player: O";
            setTurn("O");
        } else if (turn == "O") {
            document.getElementById("game-status").innerHTML = "Next player: X";
            setTurn("X");
        }
    }

    return (
        <>
            <div className="board-row">
                <Square value={squares[0]} handleClick={() => handleSquareClick(0)} />
                <Square value={squares[1]} handleClick={() => handleSquareClick(1)} />
                <Square value={squares[2]} handleClick={() => handleSquareClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} handleClick={() => handleSquareClick(3)} />
                <Square value={squares[4]} handleClick={() => handleSquareClick(4)} />
                <Square value={squares[5]} handleClick={() => handleSquareClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} handleClick={() => handleSquareClick(6)} />
                <Square value={squares[7]} handleClick={() => handleSquareClick(7)} />
                <Square value={squares[8]} handleClick={() => handleSquareClick(8)} />
            </div>
        </>
    );
}

export default function Game() {
    const [turn, setTurn] = useState("X");
    const [squares, setSquares] = useState([null, null, null, null, null, null, null, null, null]);
    const [history, setHistory] = useState([[null, null, null, null, null, null, null, null, null]]);
    const current = history[history.length - 1];

    var moves = history.map((squares, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    function jumpTo(move) {
        const nextSquares = history[move];
        const winner = checkWinner(nextSquares);
        if (winner) { return; } 
        setSquares(nextSquares);
        const nextTurn = move % 2 === 0 ? "X" : "O";
        setTurn(nextTurn);
        setHistory(history.slice(0, move + 1));

        if (nextTurn == "X") {
            document.getElementById("game-status").innerHTML = "Next player: X";
        } else if (nextTurn == "O") {
            document.getElementById("game-status").innerHTML = "Next player: O";
        }
    }

    return (
        <div className="game">
            <div className="game-board">
                <p id="game-status">Next player: X</p>
                <Board turn={turn} setTurn={setTurn} squares={squares} setSquares={setSquares} history={history} setHistory={setHistory} />
            </div>
            <div ClassName="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}