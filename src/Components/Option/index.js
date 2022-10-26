import React from 'react'
import styles from './Option.module.css'

export default function Option({ boardSize, winningRule, resetBoard }) {
    return (
        <div className={styles.option}>
            <div className={styles.optionSection}>
                <label for={'boardSize'}>
                    Board size (between 3 and 20): <span>{boardSize} x {boardSize}</span>
                </label>
                <label for={'winningRule'}>
                    The winning rule (between 3 and 5): <span>{winningRule}</span>
                </label>
            </div>
            <div className={styles.optionSection}>
                <input
                    type={'range'}
                    id={'boardSize'}
                    min={'3'} max={'20'}
                    value={boardSize}
                    onChange={(ev) => {
                        const val = ev.target.value;
                        if (val >= winningRule) {
                            resetBoard(parseInt(val), winningRule)
                        }
                    }}
                />
                <input
                    type={'range'}
                    id={'winningRule'}
                    min={'3'} max={'5'}
                    value={winningRule}
                    onChange={(ev) => {
                        const val = ev.target.value;
                        if (val <= boardSize) {
                            resetBoard(boardSize, parseInt(val))
                        }
                    }}
                />
            </div>
            <div className={styles.optionSection}>
                <button
                    onClick={() => { resetBoard() }}>
                    Reset all game
                </button>
            </div>
        </div>
    )
}
