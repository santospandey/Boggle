import React, { Component } from "react"
import Square from "./Square"
import BoardData from "./BoardData"

class Board extends Component {
    constructor() {
        super()
        this.state = {
            data: BoardData,
            selectedSquares: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    /* Initialize the Game Board with random characters
    */
    componentDidMount() {
        this.setState((prevState) => {
            const newStateArr = prevState.data.map((data) => {
                return data.map((elem) => {                    
                    return {
                        character: this.getRandomCharacter(),
                        selected: false
                    }
                })
            })
            
            return {
                data: newStateArr
            }
        })
    }

    /**
     * Select Random character from Letter A to Z
     */
    getRandomCharacter() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const index = Math.round(Math.random() * 25)
        return letters[index]
    }

    /**
     * 
     * @param {*} squareObj contains data about indivisual square
     * handle click when indivisual square is clicked.
     */
    handleClick(squareObj) {
        const row = squareObj.i
        const col = squareObj.j
        this.setState((prevState)=>{
            let newState = JSON.parse(JSON.stringify(prevState))
            newState.data[row][col].selected = !newState.data[row][col].selected
            return newState
        })
    }

    render() {
        const board = this.state.data.map((subarr, i) => {
            let squares = subarr.map((elem, j) =>
                <Square handleClick={this.handleClick}
                    key={`${i}-${j}`}
                    data={{...elem, i, j}}
                />)

            return <div key={i}>{squares}</div>
        })

        return <div>{board}</div>
    }
}

export default Board