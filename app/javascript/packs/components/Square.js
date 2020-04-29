import React, {Component} from "react"
import css from "../css/style.module.css"

class Square extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <span className={css.square}>{this.props.data}</span>
        )
    }
}

export default Square