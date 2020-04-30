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
        console.log("mounting component ")
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
        if(this.state.data.length === 0){
            return ""
        }             
        const board = this.state.data.map((subarr, i) => {
            // let squares = subarr.split("").map((elem, j) => <Square key={`${i}-${j}`} data={elem}/>)            
            // return <div key={i}>{squares}</div>
            return <div key={i}>Hello world{i}</div>
        })

        console.log("board ", board)
        return <div>{board}</div>
    }

    render() {        
        const board = this.getDOM()                    
        return (
            {board}
        )
    }
}

export default Board