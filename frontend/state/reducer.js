// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const initialWheelState = {
  currentActiveIndex: 0,
  cogs: [
    { cogNum: 0, active: true },
    { cogNum: 1, active: false },
    { cogNum: 2, active: false },
    { cogNum: 3, active: false },
    { cogNum: 4, active: false },
    { cogNum: 5, active: false },
  ]
}
function wheel(state = initialWheelState, action) {
  // first make a new array based on state and a new active index
  const newCogs = [...state.cogs];
  let newActiveIndex = state.currentActiveIndex;

  switch(action.type) {
    case actionTypes.MOVE_CLOCKWISE:
      // loop through and flip the active cog to be inactive, and activate the new cog with boundary checking, modifying the new array
      for (let i = 0; i < state.cogs.length; i++) {
        if (i === state.currentActiveIndex) {
          // deactivate the current cog, this won't change if we're at the boundary or not
          newCogs[i] = {...state.cogs[i], active: false}

          // see if we're at the end of the array and loop back to the start if we are
          if (state.currentActiveIndex === state.cogs.length - 1) {
            newCogs[0] = {...state.cogs[0], active: true};
            newActiveIndex = 0;
          //otherwise, just add one and move along
          } else {
            newCogs[i + 1] = {...state.cogs[i + 1], active: true};
            newActiveIndex = i + 1;
          }
        }
      }

      return {
        currentActiveIndex: newActiveIndex,
        cogs: newCogs
      }

      case actionTypes.MOVE_COUNTERCLOCKWISE:
        // loop through and flip the active cog to be inactive, and activate the new cog with boundary checking, modifying the new array
        for (let i = 0; i < state.cogs.length; i++) {
          if (i === state.currentActiveIndex) {
            // deactivate the current cog, this won't change if we're at the boundary or not
            newCogs[i] = {...state.cogs[i], active: false}
  
            // see if we're at the beginning of the array and loop back to the end if we are
            if (state.currentActiveIndex === 0) {
              newCogs[state.cogs.length - 1] = {...state.cogs[state.cogs.length - 1], active: true};
              newActiveIndex = state.cogs.length - 1;
            //otherwise, just subtract one and move along
            } else {
              newCogs[i - 1] = {...state.cogs[i - 1], active: true};
              newActiveIndex = i - 1;
            }
          }
        }
  
        return {
          currentActiveIndex: newActiveIndex,
          cogs: newCogs
        }

      default:
        return state
  }
}

const initialQuizState = {quiz: null, loaded: false };
function quiz(state = initialQuizState, action) {
  switch(action.type) {
    case actionTypes.SET_QUIZ_INTO_STATE:
      return {
        ...state,
        quiz: action.payload.quiz,
        loaded: action.payload.loaded
      }
    default:
      return state;
  }
}

const initialSelectedAnswerState = { selectedIndex: -1 };
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type) {
    case actionTypes.SET_SELECTED_ANSWER:
      return {
        ...state,
        selectedIndex: action.payload
      }
    default:
      return state;
  }
}

const initialMessageState = { message: '' };
function infoMessage(state = initialMessageState, action) {
  switch(action.type) {
    case actionTypes.SET_INFO_MESSAGE:
      console.log(action.payload);
      return {
        ...state,
        message: action.payload
      }
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type) {
    case actionTypes.INPUT_CHANGE:
      return {
        ...state,
        [action.payload.input]: action.payload.inputVal
      }
    case actionTypes.RESET_FORM:
      return {
        ...state,
        newQuestion: '',
        newTrueAnswer: '',
        newFalseAnswer: ''
      }
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
