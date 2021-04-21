const React = require('react');
const prettyMilliseconds = require('pretty-ms'); 

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      roshDead: false,
      roshDeathTime: 0, 
      aegisExpireTime: 0, 
      roshRespawnTime1: 0,
      roshRespawnTime2: 0, 
      start: 0,
      isOn: false
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.startRoshTimer = this.startRoshTimer.bind(this)
  }
  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now() - this.state.time,
      isOn: true
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({time: 0})
  }
  startRoshTimer(){
    this.setState({
      roshDeathTime: this.state.time,
      aegisExpireTime: this.roshDeathTime + 5,
      roshRespawnTime1: this.roshDeathTime + 8, 
      roshRespawnTime2: this.roshDeathTime + 11,
      roshDead: true
    })
    navigator.clipboard.writeText(this.aegisExpireTime + ' ' + this.roshRespawnTime1 + ' ' + this.roshRespawnTime2)
  }

  render() {
    let start = (this.state.time == 0) ?
      <button onClick={this.startTimer}>start</button> :
      null
    let stop = (this.state.isOn) ?
      <button onClick={this.stopTimer}>stop</button> :
      null
    let reset = (this.state.time != 0 && !this.state.isOn) ?
      <button class="red" onClick={this.resetTimer}>reset</button> :
      null
    let resume = (this.state.time != 0 && !this.state.isOn) ?
      <button class="green" onClick={this.startTimer}>resume</button> :
      null
    let rosh = (this.state.isOn) ? 
      <button onClick={this.startRoshTimer}> Rosh died! </button> : 
      null 

    return(
      <div>
        <h3>Timer: {prettyMilliseconds(this.state.time, {colonNotation:true})}</h3>
        {start}
        {resume}
        {stop}
        {reset}
        {rosh}
      </div>
    )
  }
}
export default App