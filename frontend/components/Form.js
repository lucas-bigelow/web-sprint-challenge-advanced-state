import React from 'react'
import { connect } from 'react-redux'
import { inputChange, postQuiz } from '../state/action-creators'

export function Form(props) {

  const onChange = evt => {
    evt.preventDefault();
    props.inputChange(evt.target.id, evt.target.value);
  }

  const onSubmit = evt => {
    evt.preventDefault();
    props.postQuiz(props);
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" value={props.newQuestion} placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" value={props.newTrueAnswer} placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" value={props.newFalseAnswer} placeholder="Enter false answer" />
      <button disabled={!props.newQuestion.trim() || !props.newTrueAnswer.trim() || !props.newFalseAnswer.trim()} id="submitNewQuizBtn" onSubmit={onSubmit}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer
  }
}

export default connect(mapStateToProps, { inputChange, postQuiz })(Form)
