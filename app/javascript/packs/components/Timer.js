import React, { Component } from "react"
import cssModule from "../css/Timer.module.css"

class Timer extends Component {
    constructor() {
        super();
        this.state = {
            time: 0,
            intervalId: null,
            constants: {
                maxTime: 120, // maximum time in seconds timer will run
                secInMin: 60  // 1 min = 60 sec
            }
        }

        this.start = this.start.bind(this)
        this.update = this.update.bind(this)
        this.stop = this.stop.bind(this)
    }

    start() {
        this.props.start();
        let intervalId = setInterval(this.update, 1000)
        this.setState({
            intervalId: intervalId
        })
    }

    update() {
        if (this.state.time >= this.state.constants.maxTime) {            
            this.stop();
            return;
        }

        this.setState((prevState) => {
            return {
                time: prevState.time + 1
            }
        })
    }

    stop() {
        this.props.stop();
        this.setState((prevState) => {
            clearInterval(prevState.intervalId)
            return {
                time: 0,
                intervalId: null
            }
        })
    }

    render() {
        const hours = Math.floor((this.state.constants.maxTime-this.state.time) / this.state.constants.secInMin)
        const minutes = (this.state.constants.maxTime-this.state.time) % this.state.constants.secInMin
        
        return (
            <div>
                {this.state.time > 0? <h2 style={{height:25}}>{hours}:{minutes}</h2>: ""}
                {this.props.display? <button type="button" onClick={this.start} className={cssModule.startBtn}>Start</button>: ""}
            </div>
        )
    }
}

export default Timer