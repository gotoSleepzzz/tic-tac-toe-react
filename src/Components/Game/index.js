import { useState } from 'react'
import Board from '../Board'

export default function Game({ BoardGame, BoardSize, handleClick, winMove }) {
    return (
        <Board
            Squares={BoardGame.squares}
            size={BoardSize}
            handleClick={handleClick}
            winMove={winMove}
        />
    )
}
