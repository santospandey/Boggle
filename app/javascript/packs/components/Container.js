import React, {Component} from "react"
import Board from "./Board"
import Timer from "./Timer"
import Search from "./Search"
import Counter from "./Counter"
import Words from "./Words"
import { SearchController } from "../controllers/Search"
import { config } from "../config"
import cssModule from "../css/Container.module.css"

class Container extends Component{
    constructor(){
        super()
        this.state = {
            start: false,
            size: 4,
            count: 0,
            data: [],
            validWords: [],
            css: {
                selectedBg: "#287328",
                background: "#4CAF50"
            },
            searchController: null
        }

        this.search = this.search.bind(this)
        this.changeState = this.changeState.bind(this)
    }

    componentDidMount(){
        this.setState((prevState) => {
            return {                                
                searchController: new SearchController(prevState.size)             
            }
        })
    }

    start() {
        this.setState((prevState)=> {
            return{
                start: true,
                count: 0,
                validWords: [],
                data: this.generateData(prevState.size)                
            }
        })        
    }

    stop() {
        this.setState({
            start: false
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

    validateWord(word) {
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

    changeState(searchResult, word){
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

    search(event) {
        event.persist();
        if (event.keyCode === 13) {
            let word = event.target.value.toUpperCase()
            const validate = this.validateWord(word)
            if (!validate) { return }

            const searchResult = this.state.searchController.search(word, this.state)

            if (searchResult.found) {
                const url = `${config.protocol}://${config.host}:${config.port}/${config.baseUrl}/word/${word}`
                fetch(url)
                    .then(data => data.json())
                    .then(data => {
                        if (data.isTrue) {
                            this.resetInputBox(event)
                            this.changeState(searchResult, word)
                        }
                    })
            }
        }
    }

    render(){
        return(
            <div className={cssModule.container}>
                <div className={cssModule.timer}>
                    <Timer display={!this.state.start} start={() => this.start()} stop={() => this.stop()}/>
                </div>
                <div className={cssModule.innerContainer}>
                    <div style={{paddingLeft: 100}}>
                        <Board data={this.state.data} css={this.state.css}/>                
                        {this.state.start?<Search search={this.search}/>: ""}
                    </div>
                    <div>
                        {this.state.count?<Counter count={this.state.count}/>: ""}
                        {this.state.validWords.length?<Words data={this.state.validWords} />: ""}
                    </div>
                </div>            
            </div>            
        )
    }
}

export default Container