import React, { Component } from "react"

class Timer extends Component {
    constructor() {
        super();
        this.state = {
            time: 0,
            intervalId: null
        }

        this.start = this.start.bind(this)
        this.timer = this.timer.bind(this)
        this.stop = this.stop.bind(this)
    }

    start() {
        this.props.start();
        let intervalId = setInterval(this.timer, 1000);
        this.setState({
            intervalId: intervalId
        })
    }

    timer() {
        if (this.state.time >= 120) {
            console.log("Timeout ...")
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
            clearInterval(prevState.intervalId);
            return {
                time: 0,
                intervalId: null
            }
        })
    }

    render() {
        return (
            <div>
                <h3>{Math.floor((120-this.state.time) / 60)}:{(120-this.state.time) % 60}</h3>
                {this.props.display? "":<button type="button" onClick={this.start}>Start</button>}
            </div>
        )
    }
}

export default Timer