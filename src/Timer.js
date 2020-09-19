import React, { Component } from 'react'
import SecondsTohhmmss from './SecondsTohhmmss'
import PropTypes from 'prop-types'

let offset = null, interval = null

/**
 * Timer module
 * A simple timer component.
**/
export default class Timer extends Component {
  static get propTypes () {
    return {
      options: PropTypes.object
    }
  }

  constructor(props) {
    super(props)
    this.state = { clock: 0, time: '' ,}
  }

  componentDidMount() {
    this.pause()
  }

  componentWillUnmount() {
    this.pause()
  }

  pause() {
    clearInterval(this.timerID)
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  play() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    if (!interval) {
      offset = Date.now()
      interval = setInterval(this.update.bind(this), this.props.options.delay)
    }
  }

  tick(){
      console.log(this.state.clock)
      if(this.state.time.includes('00:00:09.9')){
          this.reset()
          this.pause()
      }
  }

  reset() {
    let clockReset = 0
    this.setState({clock: clockReset })
    let time = SecondsTohhmmss(clockReset / 1000)
    this.setState({time: time })
  }

 

  update() {
    let clock = this.state.clock
    clock += this.calculateOffset()
    this.setState({clock: clock })
    let time = SecondsTohhmmss(clock / 1000)
    this.setState({time: time })
  }

  calculateOffset() {
    let now = Date.now()
    let newOffset = now - offset
    offset = now
    return newOffset
  }

  render() {
    const timerStyle = {
      margin: "0px",
      padding: "2em"
    };

    const buttonStyle = {
      background: "#fff",
      color: "#666",
      border: "1px solid #ddd",
      marginRight: "5px",
      padding: "10px",
      fontWeight: "200"
    };

    const secondsStyles = {
      fontSize: "200%",
      fontWeight: "500",
      lineHeight: "1.5",
      margin: "0",
      color: "#666"
    };

    return (
      <div style={timerStyle} className="react-timer">
        <h3 style={secondsStyles} className="seconds"> {this.state.time} {this.props.prefix}</h3>
        <br />
        <button onClick={this.reset.bind(this)} style={buttonStyle} >RESET SESSION</button>
        <button onClick={this.play.bind(this)} style={buttonStyle} >START WORK</button>
        <button onClick={this.play.bind(this)} style={buttonStyle} >CONTINUE WORK</button>
        <button onClick={this.pause.bind(this)} style={buttonStyle} >PAUSE WORK</button>
      </div>
    )
  }
}