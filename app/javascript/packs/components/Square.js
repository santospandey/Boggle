import React, { Component } from "react"
import cssModule from "../css/style.module.css"

class Square extends Component {
    constructor() {
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
                onClick={() => this.props.handleClick(this.props.data)}>
                {this.props.data.character}
            </span>
        )
    }
}

export default Square