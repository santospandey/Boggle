import React, { Component } from "react"
import { Square } from "./Square"
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

    getDOM() {
        return this.state.data.map((arr, i) => {
            return <div>{
                arr.map((char, j) => {
                    return <Square data={char} />
                })
            }
            </div>
        })
    }

    render() {
        const board = this.getDOM()
        return (
            { board }
        )
    }
}

export default Board