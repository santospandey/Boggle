import React, { Component } from "react"
import Square from "./Square"
import BoardData from "./BoardData"
import graph from "./GraphData"
import Search from "./Search"
import Counter from "./Counter"

class Board extends Component {
    constructor() {
        super()
        this.state = {
            count: 0,
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
            const newStateData = prevState.data.map((data, i) => {
                return data.map((data, j) => {
                    return {
                        character: this.getRandomCharacter(),
                        selected: false,
                        coordinate: `${i}${j}`,
                        visited: false,
                        distance: null,
                        parentCoordinate: null
                    }
                })
            })
            
            return {
                count: prevState.count,
                graph,
                data: newStateData
            }
        })
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


    getCoordinates(char) {
        let filteredData = []
        for (let arr of this.state.data) {
            for (let elem of arr) {
                if (elem.character === char.toUpperCase()) {
                    filteredData.push(elem)
                }
            }
        }

        return filteredData
    }


    search(event) {        
        if (event.keyCode === 13) {                        
            let string = event.target.value.toUpperCase()
                        
            // queue hold info about nodes.
            let bfsInfo = []
            let startInfo = this.getCoordinates(string[0])

            bfsInfo.push(...startInfo)

            let found = false;
            let i = 0;
            while (i < bfsInfo.length) {
                if ((bfsInfo[i].character) === (string[string.length - 1])) {
                    found = true;
                    console.log("found")
                    break;
                }

                var neighbours = this.state.graph[bfsInfo[i].coordinate];

                if (neighbours.length) {
                    var index = string.indexOf(bfsInfo[i].character);
                    var nextChar = ""
                    if (index < (string.length - 1)) {
                        nextChar = string[index + 1];
                    }                    
                    
                    var neighboursInfo = neighbours.filter((d) => {
                        let coords = d.split("").map(elem => parseInt(elem));
                        let element = this.state.data[coords[0]][coords[1]];
                        return !element.visited && (element.character === nextChar.toUpperCase())
                    }).map(d=>{
                        let chCoords = d.split("").map(e=>parseInt(e));
                        return {
                            character: this.state.data[chCoords[0]][chCoords[1]].character,
                            coordinate: d,
                            distance: i+1,
                            visited: true,
                            parentCoordinate: bfsInfo[i].coordinate,
                            parentCoordinateIndex: i
                        }
                    })

                    bfsInfo.push(...neighboursInfo)                                        

                    let coords = bfsInfo[i].coordinate.split("").map(e=>parseInt(e));
                    this.state.data[coords[0]][coords[1]].visited = true;
                }
                ++i;
            }
            if(found){                
                let index = bfsInfo.length - 1;
                this.setState((prevState) => {                   
                    while(index || (index === 0)){
                        let lastItem = bfsInfo[index];
                        let coords = lastItem.coordinate.split("");
                        prevState.data[coords[0]][coords[1]].selected = true;
                        index = lastItem.parentCoordinateIndex;
                    }                    
                    prevState.count += 1;
                    return prevState
                })                             
            }
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
                <Search search={this.search} />
                <Counter count={this.state.count} />
            </div>
        )
    }
}

export default Board