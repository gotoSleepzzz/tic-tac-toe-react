import Board from '../Board'

function listToMatrix(list, elementsPerSubArray) {
    const matrix = [];
    for (let i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }
        matrix[k].push(list[i]);
    }
    return matrix;
}

export const calculateWinner = (squares, winningRule, boardSize) => {
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

        }
    }
    if (squares.every((v) => v)) return "DRAW"
}

export function Game({ BoardGame, BoardSize, handleClick, winMove }) {
    return (
        <Board
            Squares={BoardGame.squares}
            size={BoardSize}
            handleClick={handleClick}
            winMove={winMove}
        />
    )
}
