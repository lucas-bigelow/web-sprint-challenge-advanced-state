import React from 'react';
import { connect } from 'react-redux';

import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  const handleClockwise = e => {
    e.preventDefault();
    props.moveClockwise();
  }

  const handleCounterClockwise = e => {
    e.preventDefault();
    props.moveCounterClockwise();
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        {props.cogs.map(cog => {
          return <div key={cog.cogNum} className={cog.active ? "cog active" : "cog"} style={{ "--i": cog.cogNum }}>{cog.active && "B"}</div>
        })}
        {/* <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>--i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleCounterClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    cogs: state.wheel.cogs
  }
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);
