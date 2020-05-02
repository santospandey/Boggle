import React, {Component} from "react"
import css from "../css/style.module.css"

class Square extends Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render() {
        let styleObj = {
            background: this.props.data.selected ? "green" : "yellowgreen"
        }

        return (
            <span
                style={styleObj}
                className={cssModule.square}
            >
                {this.props.data.character}
            </span>
        )
    }
}

export default Square