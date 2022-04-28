// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios';
import * as actionTypes from './action-types';

//ENDPOINTS
const GET_NEXT_QUIZ_URL = 'http://localhost:9000/api/quiz/next';
const POST_ANSWER_URL = 'http://localhost:9000/api/quiz/answer';
const POST_QUIZ_URL = 'http://localhost:9000/api/quiz/new';

export function moveClockwise() {
  return { type: actionTypes.MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: actionTypes.MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answerIndex) { 
  return { type: actionTypes.SET_SELECTED_ANSWER, payload: answerIndex}
}

export function setMessage(message) { 
  return { type: actionTypes.SET_INFO_MESSAGE, payload: message}
}

export function setQuiz(quiz) { 
  return { type: actionTypes.SET_QUIZ_INTO_STATE, payload: quiz };
}

export function inputChange(input, inputVal) { 
  return { type: actionTypes.INPUT_CHANGE, payload: {input, inputVal} };
}

export function resetForm() { 
  return { type: actionTypes.RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz({quiz: null, loaded: false}));
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get(GET_NEXT_QUIZ_URL)
      .then(res => res.data)
      .then(res => {
        dispatch(setQuiz({quiz: res, loaded: true}));
      })
      .catch(err => console.error(err));
  }
}

export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    axios.post(POST_ANSWER_URL, {
      quiz_id: quizId,
      answer_id: answerId
    })
      .then(res => {
        dispatch(selectAnswer(-1));
        dispatch(setMessage(res.data));
        console.log(res.data)
        dispatch(fetchQuiz());
      })
      .catch(err => console.error(err));
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(quiz) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post(POST_QUIZ_URL, {
      question_text: quiz.newQuestion,
      true_answer_text: quiz.newTrueAnswer,
      false_answer_text: quiz.newFalseAnswer
    })
      .then(res => {
        //console.log(res)
        dispatch(setMessage({message: `Congrats: "${res.data.question}" is a great question!`}))
        dispatch(resetForm());
      })
      .catch(err => console.error(err));
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
