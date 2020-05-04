import React from "react"
import cssModule from "../css/Words.module.css"

function getWords(items) {
    return items.map((item,index) => <li className={cssModule.item} key={index}>{item}</li>)
}

function Words(props) {

    return (
        <div className={cssModule.container} >
            <h2>Searched Words</h2>
            <ul>
                {getWords(props.data)}
            </ul>            
        </div>
    )
}

export default Words