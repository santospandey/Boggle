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
            .then((data) => {                
                this.setState({
                    data: data.data.board
                })
            })
    }


    // let squares = subarr.map((elem, j) =>
    //             <Square handleClick={this.handleClick}
    //                 key={`${i}-${j}`}
    //                 data={{ ...elem, i, j }}
    //             />)

    //         return <div key={i}>{squares}</div>

    getDOM() {
        return this.state.data.map((arr, i) => {
            return <div key={i}>{                
                arr.split("").map((char, j) => <Square data={char} key={i+"-"+j}/>)
            }
            </div>
        })        
    }

    render() {
        const board = this.getDOM()
        console.log("baord ", board)
        return (
            <div>
                { board }
            </div>            
        )
    }
}

export default Board