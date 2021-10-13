import React, {useEffect, useState} from "react";

import './Game.css'
import Square from "../components/Square";

const PLAYERS = ['Игрок 1', 'Игрок 2']

const Game = () => {

    const [winner, setWinner] = useState(null);
    const [board, setBoard] = useState(Array(9).fill(""));
    const [turn, setTurn] = useState("X");

    const styles = {
        board: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            width: "300px"
        }
    };

    useEffect(() => {
        const winningPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        let winningPositionsIndex = 0;
        let newWinner = null;
        while (winningPositionsIndex < winningPositions.length && !newWinner) {
            const boardPositionsToCheck = winningPositions[winningPositionsIndex];
            const boardValuesToCkeck = boardPositionsToCheck.map(
                (index) => board[index]
            );
            const checkingValue = boardValuesToCkeck[0];
            const isFinished = boardValuesToCkeck.every(
                (value) => value === checkingValue && checkingValue
            );
            newWinner = !isFinished ? null : checkingValue;
            winningPositionsIndex++;
        }
        if (newWinner) {
            setWinner(newWinner === "X" ? PLAYERS[0] : PLAYERS[1]);
        }
    }, [board]);


    const handleClick = (index) => {
        if (index < 0 || index > 9 || board[index] || winner) return;
        const newBoard = [...board];
        newBoard.splice(index, 1, turn);
        setBoard(newBoard);
        const newTurn = turn === "X" ? "O" : "X";
        setTurn(newTurn);
    };

    const handleRestart = () => {
        setBoard(Array(9).fill(""));
        setWinner("");
    };


    return (
        <div className='container'>
            <h1>Крестики-Нолики</h1>
            {winner && <h2>
                Победитель: {winner} ( {turn === "X" ? "O" : "X"} )
            </h2>}
            {!winner && <h3>Ходят: {turn}</h3>}
            <div style={styles.board}>
                {board.map((value, index) => (
                    <Square
                        key={index}
                        value={value}
                        index={index}
                        handleClick={handleClick}
                    />
                ))}
            </div>
            <button className='restart' onClick={handleRestart}>Restart</button>
        </div>
    );
};
export default Game;
