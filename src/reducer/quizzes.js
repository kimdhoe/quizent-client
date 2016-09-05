import { POST_NEW_QUIZ
       , RECEIVE_QUIZZES
       , SUCCESS_NEW_QUIZ
       } from '../constants'

const quizzes = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_QUIZZES:
      return action.quizzes
    case SUCCESS_NEW_QUIZ:
      return [ ...state, action.quiz ]
    default:
      return state
  }
}

export default quizzes
