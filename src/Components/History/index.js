import React from 'react'

function GetHistoryList(HistoryBoard, curStep, isAsc, jumpTo) {
    const historyList = HistoryBoard.map((history, index) =>
        <li key={index}>
            <button
                style={curStep === index ? { color: "#ff11ee", fontWeight: "bold" } : {}}
                onClick={() => { jumpTo(index) }}>
                {index === 0 ? 'Goto game start' : `Go to move #${index} (row: ${history.row}, col: ${history.col})`}
            </button>
        </li>
    )
    return isAsc ? historyList : historyList.reverse()
}

export default function History({ HistoryBoard, jumpTo, curStep, sortPressed, isAsc }) {
    return (
        <div>
            <ol>
                <button onClick={sortPressed}>
                    Sort order to: <span style={{ color: "red" }} >{isAsc ? `[ASC]` : `[DES]`} </span>
                </button>
                <br />
                {
                    GetHistoryList(HistoryBoard, curStep, isAsc, jumpTo)
                }
            </ol>
        </div >
    )
}
