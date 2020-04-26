import React, { Component } from "react"
import Square from "./Square"
import BoardData from "./BoardData"

class Board extends Component {
    constructor() {
        super()
        this.state = {
            data: BoardData,
            graph: {}
        }
        this.handleClick = this.handleClick.bind(this)
        this.search = this.search.bind(this)
    }

    /* Initialize the Game Board with random characters
    */
    componentDidMount() {
        this.setState((prevState) => {
            const newStateData = prevState.data.map((data) => {
                return data.map(() => {
                    return {
                        character: this.getRandomCharacter(),
                        selected: false
                    }
                })
            })

            let graph = {}
            for (let i = 0; i < newStateData.length; ++i) {
                for (let j = 0; j < newStateData[i].length; ++j) {
                    let key = newStateData[i][j].character
                    let adjElems = this.getAdjacentElements(i, j, newStateData)
                    if (graph.hasOwnProperty(key)) {
                        graph[key] = [...graph[key], ...adjElems]
                    }
                    else {
                        graph[key] = adjElems
                    }
                }
            }

            console.log("graph ", graph)

            return {
                graph,
                data: newStateData
            }
        })
    }

    getAdjacentElements(i, j, stateData) {
        let adjacentMatrix = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]]
        let adjacentElements = []
        for (let matrix of adjacentMatrix) {
            let row = i + matrix[0];
            let col = j + matrix[1];
            if (row < 4 && row > -1) {
                if (col < 4 && col > -1) {
                    adjacentElements.push({ ...stateData[row][col], row, col })
                }
            }
        }
        return adjacentElements
    }

    /**
     * Select Random character from Letter A to Z
     */
    getRandomCharacter() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const index = Math.floor(Math.random() * 26)
        return letters[index]
    }

    /**
     * 
     * @param {*} squareObj contains data about indivisual square
     * handle click when indivisual square is clicked. basically invert selected property
     * 
     */
    handleClick(squareObj) {
        const row = squareObj.i
        const col = squareObj.j
        this.setState((prevState) => {
            let newState = JSON.parse(JSON.stringify(prevState))
            newState.data[row][col].selected = !newState.data[row][col].selected
            return newState
        })
    }


    search(event) {
        let valid = true
        if (event.keyCode === 13) {
            const inputString = event.target.value.toUpperCase()
            const inputLength = inputString.length            
            if (inputLength) {
                let i = 0;
                while (i < (inputLength - 1)) {
                    const currentChar = inputString[i]
                    const nextChar = inputString[i+1]
                    if (!this.state.graph[currentChar]) {
                        valid = false
                        break;
                    }                      
                    const adjacentString = this.state.graph[currentChar].map((e)=>e.character).join("")
                    if(!adjacentString.includes(nextChar)){
                        valid = false;
                        break;
                    }
                    ++i;
                }
            }

            (valid === true) ? console.log("valid") : console.log("invalid")
        }
    }


    render() {
        const board = this.state.data.map((subarr, i) => {
            let squares = subarr.map((elem, j) =>
                <Square handleClick={this.handleClick}
                    key={`${i}-${j}`}
                    data={{ ...elem, i, j }}
                />)

            return <div key={i}>{squares}</div>
        })

        return (
            <div>
                {board}
                <div style={{ padding: 10 }}>
                    <label>Find word:</label>
                    <input type="text" name="searchWord" onKeyDown={this.search} />
                </div>
            </div>
        )
    }
}

export default Board