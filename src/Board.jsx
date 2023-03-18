
import Square from './Square'

export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const playTable = getTable(3,squares );

  return (
    <>
      <div className="status">{status}</div>
      {playTable}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function getTable(boardRows, previousTable ){
  const squersCount = boardRows * boardRows;

  let squersArray = [];
  for (let i = 0; i < squersCount; i++) {
    squersArray.push((<Square value={previousTable[i]} onSquareClick={() => handleClick(i)}  key={i}/>))
  }

  let table = [];
  let cutIndex=0;
  for (let i = 0; i < boardRows; i++) {
    table.push(<div key = {i} className="board-row">{squersArray.slice(cutIndex, cutIndex + boardRows)}</div>)
    cutIndex+=boardRows;
  }

  return table;
}