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
    this.roshClick = this.roshClick.bind(this)
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
  roshClick(e){
    //compute rosh timers
    let roshDeathTime = this.state.time;
    let newAegisExpire = this.state.time + 300000; //5 mins = 300000 milliseconds
    let newRespTime1 = this.state.time + 480000; // 8 mins = 480000 milliseconds
    let newRespTime2 = this.state.time + 660000; // 11 mins = 660000 milliseconds

    this.setState({
      roshDeathTime: e.target.value,
      aegisExpireTime: newAegisExpire,
      roshRespawnTime1: newRespTime1, 
      roshRespawnTime2: newRespTime2,
      roshDead: true
    })

    //format rosh timers
    newAegisExpire = prettyMilliseconds(newAegisExpire, {colonNotation:true}); 
    newRespTime1 = prettyMilliseconds(newRespTime1, {colonNotation:true}); 
    newRespTime2 = prettyMilliseconds(newRespTime2, {colonNotation:true}); 
    newAegisExpire = newAegisExpire.slice(0, -2);
    newRespTime1 = newRespTime1.slice(0, -2); 
    newRespTime2 = newRespTime2.slice(0, -2); 

    //log to console for our own sanity
    console.log(roshDeathTime, newAegisExpire, newRespTime1, newRespTime2); 
    navigator.clipboard.writeText(newAegisExpire + ' ' + newRespTime1 + ' ' + newRespTime2); 

    /**
     * TODO: let user know the rosh timer has been copied to clipboard 
     * in an elegant manner
     */
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
      <button onClick={this.roshClick.bind(this)} value={this.state.time}> Rosh died! </button> : 
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