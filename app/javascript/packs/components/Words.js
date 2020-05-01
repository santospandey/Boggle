import React from "react"

function getWords(items) {
    return items.map((item,index) => <div key={index}>{item}</div>)
}

function Words(props) {

    return (
        <div>
            {props.data.length?<h3>Selected Words</h3>:""}
            {getWords(props.data)}
        </div>
    )
}

export default Words