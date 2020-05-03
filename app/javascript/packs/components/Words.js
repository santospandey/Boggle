import React from "react"

function getWords(items) {
    return items.map((item,index) => <div key={index}>{item}</div>)
}

function Words(props) {

    return (
        <div>
            {props.data.length?<h2>Searched Words</h2>:""}
            {getWords(props.data)}
        </div>
    )
}

export default Words