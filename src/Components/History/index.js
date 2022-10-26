import React from 'react'

export default function History({ HistoryBoard, jumpTo, curStep, sortPressed, isAsc }) {
    return (
        <div>
            <ol>
                <button onClick={sortPressed}>
                    Sort order to: <span style={{ color: "red" }} >{isAsc ? `[ASC]` : `[DES]`} </span>
                </button>
                <br />
                {
                    isAsc ? HistoryBoard.map((history, index) =>
                        <li key={index}>
                            <button
                                style={curStep === index ? { color: "#ff11ee", fontWeight: "bold" } : {}}
                                onClick={() => { jumpTo(index) }}>
                                {index === 0 ? 'Goto game start' : `Go to move #${index} (row: ${history.row}, col: ${history.col})`}
                            </button>
                        </li>
                    ) :
                        HistoryBoard.map((history, index) =>
                            <li key={index}>
                                <button
                                    style={curStep === index ? { color: "#ff11ee", fontWeight: "bold" } : {}}
                                    onClick={() => { jumpTo(index) }}>
                                    {index === 0 ? 'Goto game start' : `Go to move #${index} (row: ${history.row}, col: ${history.col})`}
                                </button>
                            </li>
                        ).reverse()
                }
            </ol>
        </div >
    )
}
