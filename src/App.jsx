import { useState } from "react";

import Board from './Board'


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const [moves, setMoves] = useState(
    history.map((squares, move) => {
      if (currentMove === move) {
        return (
          <li key={move}>
            <p>{`You are at move #${move}`}</p>
          </li>
        );
      }

      const description = move > 0 ? `Go to move #${move}` : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }).reverse()
  );

    const [isReverse, setReverse]=useState(false)

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setMoves(
      history.map((squares, move) => {
        if (currentMove === move) {
          return (
            <li key={move}>
              <p>{`You are at move #${move}`}</p>
            </li>
          );
        }

        const description = move > 0 ? `Go to move #${move}` : "Go to game start";

        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
      })
    )
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function sortStepButtons() {
    // FIXME
    const newMoves = history.map((squares, move) => {
      if (currentMove === move) {
        return (
          <li key={move}>
            <p>{`You are at move #${move}`}</p>
          </li>
        );
      }

      const description = move > 0 ? `Go to move #${move}` : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });

    if(isReverse){
      newMoves.reverse();
      setReverse(false);
    } else {
      setReverse(true);
    }

    setMoves(newMoves);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => sortStepButtons()}>Toggle</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}