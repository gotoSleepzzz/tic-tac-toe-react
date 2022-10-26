import { useState } from "react";
import Game from "./Components/Game";
import Option from "./Components/Option";
import History from "./Components/History";
import './App.css'

const WIDTH = 3
const RULE = 3

function listToMatrix(list, elementsPerSubArray) {
  var matrix = [], i, k;
  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
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
    const result = calculateWinner(squares)

    if (result) {
      if (result === "DRAW") {
        setWinner('DRAW')
      } else {
        console.log('bug here')
        setWinner(squares[result[0]])
        console.log(result)
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
    const result = calculateWinner(history[i].squares)
    console.log(result)

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

  const calculateWinner = (squares) => {
    const winPos = Array(winningRule).fill(null)
    const newArr = listToMatrix(squares, boardSize);

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const rowCheck = winPos.map((_, index) => newArr[i] ? newArr[i][j + index] : undefined)
        if (rowCheck.every((v) => v && v === newArr[i][j])) return winPos.map((_, index) => (i * boardSize + j + index))

        const colCheck = winPos.map((_, index) => newArr[i + index] ? newArr[i + index][j] : undefined)
        if (colCheck.every((v) => v && v === newArr[i][j])) return winPos.map((_, index) => boardSize * (i + index) + j)

        const diagRightCheck = winPos.map((_, index) => newArr[i + index] ? newArr[i + index][j + index] : undefined)
        if (diagRightCheck.every((v) => v && v === newArr[i][j])) return winPos.map((_, index) => boardSize * (i + index) + j + index)

        const diagLeftCheck = winPos.map((_, index) => newArr[i + index] ? newArr[i + index][j - index] : undefined)
        if (diagLeftCheck.every((v) => v && v === newArr[i][j])) return winPos.map((_, index) => boardSize * (i + index) + j - index)

        //console.log('left', diagLeftCheck)
        //console.log('right', diagRightCheck)
      }

    }
    if (squares.every((v) => v)) return "DRAW"
  }

  return (
    <div className="game">
      <div className="game-option">
        <Option
          boardSize={boardSize}
          winningRule={winningRule}
          resetBoard={resetBoard}
        />
        <History HistoryBoard={history} jumpTo={jumpTo} curStep={step} isAsc={isSortAsc} sortPressed={() => { setIsSortAsc(!isSortAsc) }} />
      </div>
      <div className="game-board">
        {
          winner === "DRAW" ?
            <span style={{ color: "blue", fontWeight: 'bold' }} >DRAW</span> :
            winner === 'X' ?
              <span style={{ color: "gold", fontWeight: 'bold' }} >Winner is X</span> :
              winner === 'O' ?
                <span style={{ color: "gold", fontWeight: 'bold' }} >Winner is O</span> :
                <span style={{ color: "blue", fontWeight: 'bold' }} >Next player: {xIsNext ? 'X' : 'O'}</span>
        }
        <Game BoardSize={boardSize} BoardGame={history[step]} handleClick={onBoardClick} winMove={winMove} />
      </div>
    </div>
  );
}

export default App;
