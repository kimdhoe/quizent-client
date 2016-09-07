import { RECEIVE_MY_QUIZZES
       , RECEIVE_MY_QUIZ } from '../constants'

const myQuizzes = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_MY_QUIZZES:
      return action.quizzes
    case RECEIVE_MY_QUIZ:
      return [ action.quiz, ...state ]
    default:
      return state
  }
}

export default myQuizzes
