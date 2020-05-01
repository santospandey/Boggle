import React from "react"

function Search(props) {
    return (
        <div style={{ padding: 10 }}>            
            <input type="text" name="searchWord" onKeyDown={props.search} placeholder="Enter words..."/>
        </div>
    )
}

export default Search