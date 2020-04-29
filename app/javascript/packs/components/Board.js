import React, { Component } from "react"
import axios from "axios"

class Board extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3000/random_characters")
            .then((data) => data.json())
            .then((data) => {
                this.setState({
                    data: data.board
                })
            })
    }

    render() {
        return (
            <h1>Hello world3</h1>
        )
    }
}

export default Board