import { useState } from 'react'
import conffeti from "canvas-confetti"
import './App.css'
import { Square } from './components/Square'
import { turns } from './components/constants'
import {  checkWinner, checkEndGame } from './logics/Board'
import { WinModal } from './components/WinModal'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(turns.X)
  const [winner, setWinner] = useState(null)
  
    const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
  };

 const updateBoard = (index, board) => {
  if (board[index] || winner) return;

  const newBoard = [...board];
  newBoard[index] = turn;
  setBoard(newBoard);
  const newTurn = turn == turns.X ? turns.O : turns.X;
  setTurn(newTurn);

  const newWinner = checkWinner(newBoard);
  if (newWinner) {
    conffeti();
    setWinner(newWinner);
  } else if (checkEndGame(newBoard)) {
    setWinner(false);
  }
};

  
  
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>

      <section className='game'>
        {
          board.map((square, index) => {
            return(
              <Square key={index} index={index} updateBoard={updateBoard} board={board}>
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn == turns.X}>{turns.X}</Square>
        <Square isSelected={turn == turns.O}>{turns.O}</Square>
      </section>

      {winner != null && (
        <>
        <WinModal winner={winner} resetGame={resetGame}/>
        </>
      )}
    </main>
  
  )
}

export default App
