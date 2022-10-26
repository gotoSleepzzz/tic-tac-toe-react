import React from 'react'
import Square from '../Square'
import styles from './Board.module.css'

export default function Board({ Squares, size, handleClick, winMove }) {
    return (
        <div>
            {Array(size).fill(null).map((_, row) =>
                <div key={row} className={styles.boardRow} >
                    {Array(size).fill(null).map((_, col) =>
                        <Square
                            value={Squares[row * size + col]}
                            key={row * size + col}
                            handleClick={handleClick}
                            index={row * size + col}
                            isWinMove={winMove.find((v) => v === (row * size + col)) > -1}
                        />
                    )}
                </div>
            )}
        </div>
    )
}
