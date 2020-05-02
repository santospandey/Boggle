import React from "react"
import cssModule from "../css/Square.module.css"

function Square(props) {
    const {background, character} = props.data
    return (
        <span className={cssModule.square} style={{background: background}}>
            {character}
        </span>
    )
}

export default Square