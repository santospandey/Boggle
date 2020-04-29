import React, {Component} from "react"
import css from "../css/style.module.css"

class Square extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <p className={css.square}>Square</p>
        )
    }
}

export default Square