import React from "react"

function Search(props) {
    return (
        <div style={{ padding: 10 }}>
            <label>Find word:</label>
            <input type="text" name="searchWord" onKeyDown={props.search}/>
        </div>
    )
}

export default Search