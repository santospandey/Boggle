import React from "react"

function Counter(props) {
    return (
        <div style={{padding: 15}}>
            <span>Score:</span>&nbsp;<strong style={{fontSize: 24}}>{props.count}</strong>
        </div>        
    )
}

export default Counter