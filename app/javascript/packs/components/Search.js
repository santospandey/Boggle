import React from "react"
import cssModule from "../css/Search.module.css"

function Search(props) {
    return (
        <div className={cssModule['input-box']}>
            <input type="text" name="searchWord" onKeyDown={props.search} disabled={props.disabled} placeholder="Enter words..."/>
        </div>
    )
}

export default Search