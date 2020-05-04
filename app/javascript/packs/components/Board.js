import React from "react"
import Square from "./Square"

function getBoard(props){
    return props.data.map((subarr, i) => {
        let squares = subarr.map((elem, j) =>
            <Square
                key={`${i}-${j}`}
                data={{ character: elem.character, background: elem.selected ? props.css.selectedBg : props.css.background }}
            />)

        return <div key={i}>{squares}</div>
    })
}

function Board(props){
    return (
        <div>
            {getBoard(props)}
        </div>
    )
}

export default Board