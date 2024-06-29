import { useState } from 'react'
import { Square } from './components/Square'
import { ButtonResetGame } from './components/Buttons'
import { ResultModal } from './components/ResultModal'
import { TURNS, INITIALBOARDSTATE, INITIALTURNSTATE, INITIALWINNERSTATE } from './utils/constants';
import { WinnerType } from './utils/types';
import { checkWinner, checkEndGame } from './logic/board';
import { BoardGame } from './components/BoardGame';
import { Turns } from './components/Turns';

function App() {
  const [board, setBoard] = useState<string[]>(INITIALBOARDSTATE)
  const [turn, setTurn] = useState<string>(INITIALTURNSTATE)
  const [winner, setWinner] = useState<WinnerType>(INITIALWINNERSTATE)
  
  const updateBoard = (index: number): void => {
    // No sobreescribir cuadrado cuando ya está marcado o cuando ya ha terminado la partida
    if (board[index] || winner) return

    // Actualizar contenido del cuadrado
    const newBoard: string[] = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Revisar si hay ganador
    const newWinner: string | null = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    // Actualizar turno
    const newTurn: string = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  const resetGame = (): void => {
    setBoard(INITIALBOARDSTATE)
    setTurn(INITIALTURNSTATE)
    setWinner(INITIALWINNERSTATE)
  }

  return (
    <>
      <main className='flex flex-col items-center justify-center h-screen bg-gray-900 text-white'>
        <h1 className='text-7xl'>Tic tac toe</h1>
        <section className='grid grid-cols-3 gap-2 my-4'>
          <BoardGame board={board} updateBoard={updateBoard} />
        </section>

        <h3 className='text-3xl'>Turno</h3>
        <section className='flex flex-row gap-2 my-4'>
          <Turns turn={turn}></Turns>
        </section>

        <ButtonResetGame resetGame={resetGame}>Reiniciar partida</ButtonResetGame>
        
        <ResultModal winner={winner} resetGame={resetGame} />
      </main>
    </>
  )
}

export default App
