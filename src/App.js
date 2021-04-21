import React from "react";
import Timer from "./Components/Timer";
import { Hotkeys } from "react-hotkeys";

/**
 * TODO:
 * - let user know the rosh timer has been copied to clipboard in an elegant manner
 * - Create new timers on roshan click for alex's cool design ideas
 * - maybe start timer at -2:00 or whatever since dota doesn't start at 0:00
 *
 */



class App extends React.Component {
  render() {
    return <Timer></Timer>;
  }
}
export default App;
