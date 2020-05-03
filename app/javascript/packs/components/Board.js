import React, { Component } from "react"
import Square from "./Square"
import Search from "./Search"
import Counter from "./Counter"
import Words from "./Words"
import Timer from "./Timer"
import cssModule from "../css/style.module.css"
import { SearchController } from "../controllers/Search"
import { config } from "../config"

class Board extends Component {
    constructor() {
        super()
        this.state = {
            start: false,
            searchController: null,
            size: 4,
            count: 0,
            data: [],
            validWords: [],
            css: {
                selectedBg: "#287328",
                background: "#96d53c"
            }
        }
        this.search = this.search.bind(this)
        this.initialize = this.initialize.bind(this)
    }
    
    componentDidMount(){
        
    }

    initialize() {
        this.setState((prevState) => {
            return {
                count: 0,
                start: true,
                searchController: new SearchController(prevState.size),
                data: this.generateData(prevState.size),
                validWords: []
            }
        })
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

    getRandomCharacter() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const index = Math.floor(Math.random() * 26)
        return letters[index]
    }

    resetInputBox(event) {
        event.target.value = ""
    }

    validateWord(word){
        let valid = true
        if (word.length < 2) {
            alert("Please enter word of at least 2 characters");
            valid = false
        }
        if (this.state.validWords.includes(word)) {
            alert("Already added in list")
            valid = false
        }
        return valid
    }

    search(event) {
        event.persist();
        if (event.keyCode === 13) {
            let word = event.target.value.toUpperCase()            
            const validate = this.validateWord(word)
            if(!validate){return}

            const searchResult = this.state.searchController.search(word, this.state)

            if (searchResult.found) {
                const url = `${config.protocol}://${config.host}:${config.port}/${config.baseUrl}/word/${word}`
                fetch(url)
                    .then(data => data.json())
                    .then(data => {
                        if (data.isTrue) {
                            this.resetInputBox(event)
                            this.setState((prevState) => {
                                const data = prevState.data.map((arr, i) => {
                                    return arr.map((element, j) => {
                                        element.selected = searchResult.coordinateHistory.includes(`${i}${j}`) ? true : false
                                        return element
                                    })
                                })
                                const validWords = [...prevState.validWords, word]
                                const count = prevState.count + word.length

                                return {
                                    count: count,
                                    data: data,
                                    validWords: validWords
                                }
                            })
                        }
                    })
            }
        }
    }

    start() {
        this.initialize()
    }

    stop() {
        this.setState({
            start: false
        })
    }

    getBoard() {
        return this.state.data.map((subarr, i) => {
            let squares = subarr.map((elem, j) =>
                <Square
                    key={`${i}-${j}`}
                    data={{ character: elem.character, background: elem.selected ? this.state.css.selectedBg : this.state.css.background }}
                />)

            return <div key={i}>{squares}</div>
        })
    }

    render() {
        const board = this.getBoard()

        return (
            <div className={cssModule.container}>
                <div>{board}{this.state.start?<Search search={this.search} disabled={!this.state.start}/>:""}</div>
                <div>
                    <div className={cssModule.wrapper}>
                        <Timer display={this.state.start} start={() => this.start()} stop={() => this.stop()} />
                        <Counter count={this.state.count} />
                    </div>
                    <div>
                        <Words data={this.state.validWords} />
                    </div>                                        
                </div>
            </div>
        )
    }
}

export default Board