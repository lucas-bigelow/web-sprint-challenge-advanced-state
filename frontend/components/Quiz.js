import React from 'react';
import { connect } from 'react-redux';

import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

function Quiz(props) {
  if(!props.loaded) {
    props.fetchQuiz();
  }

  // event handlers

  const handleSelected = (e, indexSelected) => {
    e.preventDefault();
    props.selectAnswer(indexSelected);
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.postAnswer(props.quiz.quiz_id, props.quiz.answers[props.selectedIndex].answer_id);
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.loaded ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              {/* TODO: FIX HARDCODING, BUT IT'S OKAY FOR NOW BECAUSE MVP
              {props.quiz.answers.map(answer => {
                return (
                  <div key={answer.answer_id} className={"answer selected"}>
                    {answer.text}
                    <button>
                      SELECTED
                    </button>
                  </div>
                )
              })} */}
             
              <div className={props.selectedIndex === 0 ? "selected answer" : "answer"}>
                {props.quiz ? props.quiz.answers[0].text : ''}
                <button onClick={(e) => handleSelected(e, 0)} value={0}>
                  {props.selectedIndex === 0 ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={props.selectedIndex === 1 ? "selected answer" : "answer"}>
                {props.quiz ? props.quiz.answers[1].text : ''}
                <button onClick={(e) => handleSelected(e, 1)} value={1}>
                  {props.selectedIndex === 1 ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button onClick={handleSubmit} id="submitAnswerBtn" disabled={props.selectedIndex === -1} >Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz.quiz,
    loaded: state.quiz.loaded,
    selectedIndex: state.selectedAnswer.selectedIndex
  }
}

export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz);