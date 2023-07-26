import { useState } from 'react'
import conffeti from "canvas-confetti"
import './App.css'
import { Square } from './components/Square'
import { turns } from './components/constants'
import {  checkWinner, checkEndGame } from './logics/Board'
import { WinModal } from './components/WinModal'
import confetti from 'canvas-confetti'

function App() {
  const boardFromLocalStorage = window.localStorage.getItem("board")

  const [board, setBoard] = useState(() => {
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)})
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem("turn")
    console.log(turnFromLocalStorage)
    return turnFromLocalStorage ?? turns.X
  })
  const [winner, setWinner] = useState(null)
  
  

    const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
  };

 const updateBoard = (index, board) => {
  if (board[index] || winner) return;
  const newBoard = [...board];
  newBoard[index] = turn;
  setBoard(newBoard);
  const newTurn = turn == turns.X ? turns.O : turns.X;
  setTurn(newTurn);
  window.localStorage.setItem("board", JSON.stringify(newBoard))
  window.localStorage.setItem("turn", newTurn)
  
  const newWinner = checkWinner(newBoard);
  if (newWinner) {
    conffeti();
    setWinner(newWinner);
  window.localStorage.removeItem("board")
  window.localStorage.removeItem("turn")
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
