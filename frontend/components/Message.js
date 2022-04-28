import React from 'react'
import { connect } from 'react-redux'

function Message(props) {
  return <div id="message">{props.message.message}</div>
}

const mapStateToProps = state => {
  return {
    message: state.infoMessage.message
  }
}

export default connect(mapStateToProps, {})(Message);
