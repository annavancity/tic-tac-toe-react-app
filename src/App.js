import './App.css';
import {useEffect, useState} from 'react';
import Board from './Board';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gamerX, setGamerX] = useState(true);
  const [winner, setWinner] = useState(null);
  const handleMove = (ind) => {
    if (board[ind] === null) {
      const nextGamer = gamerX ? 'X' : 'O'
      const newBoard = board.map((elem, index) => ind === index ? nextGamer : elem)
      setBoard(newBoard)
      setGamerX(!gamerX)
    }
  }

  const resetBoard = () => {
    const clearBoard = board.map(el => el = null);
    setWinner(null);
    setBoard(clearBoard);
  }

  const fillBoardSpace = () => {
    const newBoard = board.map(el => el === null ? ' ' : el);
    setBoard(newBoard);
  }

  const greetingMsg = `${winner} is a winner! Congrats!`;
  const drawMsg = `Try again, we have no winner.`;

  const winnerOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
  ]

  useEffect(() => {
    checkWinner();
  },[board])

  const checkWinner = () => {
    for(let i = 0; i < winnerOptions.length; i++){
      const [a, b, c] = winnerOptions[i]
      if(board[a] === board[b] && board[a] === board[c] && board[c] === board[b]  && board[a] !== null) {
        if(!winner) {
          setWinner(board[a]);
          fillBoardSpace()
        }
      }
    }
  }

  const isDraw = () => {
    const arr = board.filter(el => el === null || el === ' ');
    return !arr.length;
  }



  return (
    <div className='App'>
      <h1>Tic Tac Toe</h1>
      <Board
        board={board}
        handleMove={handleMove}
      />
      { winner && <p id={'congrats'}>
        <h2>{greetingMsg}</h2>
        <button className={'restartBtn'} onClick={resetBoard}>Play Again</button>
      </p> }

      { !winner && isDraw() && <p id={'draw'}>
        <h2>{drawMsg}</h2>
        <button className={'restartBtn'} onClick={resetBoard}>Play Again</button>
      </p> }
    </div>
  );
}

export default App;
