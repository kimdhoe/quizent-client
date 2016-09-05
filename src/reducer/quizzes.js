import { POST_NEW_QUIZ
       , RECEIVE_QUIZZES
       , SUCCESS_NEW_QUIZ
       , RECEIVE_QUIZ
       } from '../constants'

const quizzes = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_QUIZZES:
      return action.quizzes
    case RECEIVE_QUIZ:
      return [ action.quiz, ...state ]
    default:
      return state
  }
}

export default quizzes
