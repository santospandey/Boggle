import React from "react"

function Counter(props) {
    return (
        <div>
            <span>Score:</span>&nbsp;<strong style={{fontSize: 24}}>{props.count}</strong>
        </div>        
    )
}

export default Counter