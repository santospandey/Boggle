import React, {Component} from "react"
import css from "../css/style.module.css"

class Square extends Component{
    constructor(){
        super()
    }

    render(){
        console.log("props ", this.props.data);
        return(
            <span className={css.square}>{this.props.data.data}</span>
        )
    }
}

export default Square