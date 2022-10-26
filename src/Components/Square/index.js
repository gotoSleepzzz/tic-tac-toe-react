import React from 'react'
import styles from './Square.module.css'

export default function Square({ value, handleClick, index, isWinMove }) {
    return (
        <button
            className={`${styles.square} ${isWinMove ? styles.win : {}}`}
            onClick={() => { handleClick(index) }} >
            {value}
        </button>
    )
}