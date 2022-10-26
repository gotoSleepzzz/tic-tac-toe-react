import { useState } from "react";
import { Game, calculateWinner } from "./Components/Game";
import Option from "./Components/Option";
import History from "./Components/History";
import './App.css'

const WIDTH = 3
const RULE = 3

function getGameStatus(winner, xIsNext) {
  switch (winner) {
    case "DRAW":
      return <span style={{ color: "blue", fontWeight: 'bold' }} >DRAW</span>
    case "X":
      return <span style={{ color: "gold", fontWeight: 'bold' }} >Winner is X</span>
    case "O":
      return <span style={{ color: "gold", fontWeight: 'bold' }} >Winner is O</span>
    default:
      return <span style={{ color: "blue", fontWeight: 'bold' }} >Next player: {xIsNext ? 'X' : 'O'}</span>
  }
}

function App() {
  const [boardSize, setBoardSize] = useState(WIDTH)
  const [winningRule, setWinningRule] = useState(RULE)
  const [step, setStep] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState(null)
  const [winMove, setWinMove] = useState([])
  const [isSortAsc, setIsSortAsc] = useState(true)
  const [history, setHistory] = useState([
    {
      squares: Array(WIDTH * WIDTH).fill(null),
      row: null,
      col: null,
      step: 0
    }
  ])

  const resetBoard = (boardSize, winningRule) => {
    const newSize = boardSize ? boardSize : WIDTH
    const newRule = winningRule ? winningRule : RULE
    setBoardSize(newSize)
    setWinningRule(newRule)
    setStep(0)
    setXIsNext(true)
    setWinner(null)
    setWinMove([])
    setHistory([
      {
        squares: Array(newSize * newSize).fill(null),
        row: null,
        col: null,
        step: 0
      }
    ])
  }

  const onBoardClick = (i) => {
    const newHistory = history.slice(0, step + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || winner) return;

    squares[i] = xIsNext ? "X" : "O";
    const result = calculateWinner(squares, winningRule, boardSize)

    if (result) {
      if (result === "DRAW") {
        setWinner('DRAW')
      } else {
        setWinner(squares[result[0]])
        if (result[1]) {
          setWinMove(result)
        }
      }
    }


    setHistory([...newHistory, {
      squares: squares,
      row: (i - (i % boardSize)) / boardSize,
      col: i % boardSize,
      step: step + 1
    }])
    setStep(step + 1)
    setXIsNext(!xIsNext)
  }

  const jumpTo = (i) => {
    setStep(i)
    setXIsNext((i % 2) === 0)
    const result = calculateWinner(history[i].squares, winningRule, boardSize)

    if (result) {
      if (result === "DRAW") {
        setWinner('DRAW')
      } else {
        setWinner(history[i].squares[result[0]])
        setWinMove(result)
      }
    } else {
      setWinner(null)
      setWinMove([])
    }
  }

  return (
    <div className="game">
      <div className="game-option">
        <Option
          boardSize={boardSize}
          winningRule={winningRule}
          resetBoard={resetBoard}
        />
        <History
          HistoryBoard={history}
          jumpTo={jumpTo}
          curStep={step}
          isAsc={isSortAsc}
          sortPressed={() => {
            setIsSortAsc(!isSortAsc)
          }}
        />
      </div>
      <div className="game-board">
        {
          getGameStatus(winner, xIsNext)
        }
        <Game BoardSize={boardSize} BoardGame={history[step]} handleClick={onBoardClick} winMove={winMove} />
      </div>
    </div>
  );
}

export default App;
