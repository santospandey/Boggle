import React, { Component } from "react"
import Square from "./Square"
import Search from "./Search"
import Counter from "./Counter"
import Words from "./Words"
import Timer from "./Timer"
import cssModule from "../css/style.module.css"

class Board extends Component {
    constructor() {
        super()
        this.state = {
            start: false,
            size: 4,
            count: 0,
            data: [],
            graph: {},
            validWords: []
        }        
        this.search = this.search.bind(this)
        this.initialize = this.initialize.bind(this)
    }

    componentDidMount() {
        // this.initialize()
    }

    initialize() {
        this.setState((prevState) => {
            return {
                count: 0,
                start: true,
                graph: this.generateGraph(prevState.size),
                data: this.generateData(prevState.size),
                validWords: []
            }
        })
    }


    generateGraph(n) {
        let graph = {}
        Array.from(Array(n).keys()).map((i) => {
            return Array.from(Array(n).keys()).map((j) => {
                graph[`${i}${j}`] = this.getNeighbors(i, j, n)
            })
        })
        return graph;
    }

    generateData(n) {
        return Array.from(Array(n).keys()).map(() => {
            return Array.from(Array(n).keys()).map(() => {
                return {
                    character: this.getRandomCharacter(),
                    selected: false
                }
            })
        })
    }

    getNeighbors(row, col, total) {
        const neighbourMatrix = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        return neighbourMatrix.map((m) => [m[0] + row, m[1] + col]).filter((item) => (((item[0] > -1) && (item[0] < total)) && ((item[1] > -1) && (item[1] < total)))).map((d) => `${d[0]}${d[1]}`)
    }

    /**
     * Select Random character from Letter A to Z
     */
    getRandomCharacter() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const index = Math.floor(Math.random() * 26)
        return letters[index]
    }    


    getCoordinates(char) {
        let filteredData = []
        for (let i = 0; i < this.state.data.length; i++) {
            for (let j = 0; j < this.state.data[i].length; j++) {
                if (this.state.data[i][j].character === char) {
                    filteredData.push(`${i}${j}`)
                }
            }
        }
        return filteredData
    }

    // let squares = subarr.map((elem, j) =>
    //             <Square handleClick={this.handleClick}
    //                 key={`${i}-${j}`}
    //                 data={{ ...elem, i, j }}
    //             />)

    search(event) {
        event.persist();
        if (event.keyCode === 13) {
            let string = event.target.value.toUpperCase()

            /**
             * String should have minimum length 3
             */
            if (string.length < 2) {
                alert("Please enter string at least 2 characters");
                return;
            }

            if (this.state.validWords.includes(string)) {
                alert("Repeated words");
                return;
            }

            // queue hold info about nodes.
            let bfsInfo = []
            let startNodes = this.getCoordinates(string[0]).map((d, index) => {
                return {
                    character: string[0],
                    fullString: string[0],
                    coordinate: d,
                    coordinateHistory: [d],
                    parentCoordinateIndex: index
                }
            })

            bfsInfo.push(...startNodes)

            let i = 0;
            let found = false;
            let finalNode = null;

            while (i < bfsInfo.length) {
                /**
                 * Find all neighbours of current character in queue.
                */
                var neighbours = this.state.graph[bfsInfo[i].coordinate];

                /**
                 * If neighbours are present or if neighbours arrary has length > 0.
                 */
                if (neighbours.length) {
                    var neighboursInfo = neighbours.filter((d) => {
                        let coords = d.split("").map(elem => parseInt(elem));
                        let character = this.state.data[coords[0]][coords[1]].character;

                        /**
                         * Search from coordinate history whether this coordinate is present 
                         */
                        let parentCoords = bfsInfo[i].coordinateHistory;
                        let nextChar = string[parentCoords.length];

                        let index = parentCoords.indexOf(d);
                        return (index < 0) && (character === nextChar)
                    }).map(d => {
                        let chCoords = d.split("").map(e => parseInt(e));
                        let coords = [...bfsInfo[i].coordinateHistory, d];
                        let fullString = bfsInfo[i].fullString + this.state.data[chCoords[0]][chCoords[1]].character;
                        return {
                            character: this.state.data[chCoords[0]][chCoords[1]].character,
                            coordinate: d,
                            fullString: fullString,
                            coordinateHistory: coords,
                            parentCoordinateIndex: i
                        }
                    })

                    bfsInfo.push(...neighboursInfo)
                }

                for (let node of neighboursInfo) {
                    if (node.fullString === string) {
                        found = true;
                        finalNode = node;
                    }
                }

                if (found) {
                    break;
                }

                ++i;
            }

            if (found) {
                console.log("found ", finalNode);
            }
            else {
                console.log("Not found");
            }

            if (found) {                
                // calls api to check if word present in dictionary
                fetch("http://localhost:3000/word/" + string)
                    .then(data => data.json())
                    .then(data => {
                        if (data.isTrue) {
                            event.target.value = "" // reset input box
                            this.setState((prevState) => {
                                prevState.data.forEach(elements => {
                                    elements.forEach(element => {
                                        element.selected = false;
                                    })
                                });

                                for (let index of finalNode.coordinateHistory) {
                                    let coords = index.split("").map(d => parseInt(d));
                                    prevState.data[coords[0]][coords[1]].selected = true;
                                }

                                prevState.validWords.push(string);

                                prevState.count += string.length;
                                return prevState
                            })
                        }
                    })
            }
        }
    }


    start() {
        console.log("Timer Starting...")
        this.initialize()
    }

    stop() {
        this.setState((prevState) => {
            return {
                ...prevState,
                start: false
            }
        })
    }


    render() {
        const board = this.state.data.map((subarr, i) => {
            let squares = subarr.map((elem, j) =>
                <Square
                    key={`${i}-${j}`}
                    data={{ ...elem, i, j }}
                />)

            return <div key={i}>{squares}</div>
        })        

        console.log("board ", board)
        return <div>{board}</div>
    }

    render() {        
        const board = this.getDOM()                    
        return (
            <div className={cssModule.container}>
                <div>
                    {this.state.start ?
                    <div>
                        {board}
                        <Search search={this.search} />
                    </div> : ""}
                </div>
                <div>
                    <Timer display={this.state.start} start={() => this.start()} stop={() => this.stop()} />
                    <Counter count={this.state.count} />
                    <Words data={this.state.validWords} />
                </div>
            </div>
        )
    }
}

export default Board