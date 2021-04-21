import React from "react";
import { Progress } from 'rsuite';
const {Circle} = Progress;

class DynamicProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      status: null,
      percent: 0,
      color: "#3385ff",
      isOn: false,
      endTime: 0,
      time: 0,
      isVisible: false,
    };
    this.decline = this.decline.bind(this);
    this.increase = this.increase.bind(this);
  }
  startTimer(endTime, time){
    this.setState({
      endTime: endTime,
      time: time,
      isVisible:true
    }); 
    this.timer=setInterval(()=>
      this.setState({
      /**
       * TODO: GET THEM PERCENT THINGIES MOVIN
       *  */      
      }))
  }
  changePercent(nextPercent) {
    const percent = nextPercent < 0 ? 0 : nextPercent > 100 ? 100 : nextPercent;
    this.setState({
      percent,
      status: percent === 100 ? "WE DONE BOIS" : null,
      color: percent === 100 ? "#52c41a" : "#3385ff",
    });
  }
  decline(incr) {
    this.changePercent(this.state.percent - incr);
  }
  increase(incr) {
    this.changePercent(this.state.percent + incr);
  }

  render() {
    const {percent, color, status} = this.state;
    return(
      <div>
        <Circle percent = {percent} strokeColor = {color} status={status} />
      </div>
    )
  }
}
