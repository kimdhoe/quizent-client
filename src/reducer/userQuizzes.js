import { DELETED_QUIZ
       , RECEIVE_USER_QUIZZES
       , RECEIVE_LATEST_USER_QUIZZES } from '../constants'

const userQuizzes = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USER_QUIZZES:
      return [ ...state, ...action.quizzes ]
    case DELETED_QUIZ:
      return state.filter(quiz => quiz._id !== action.id)
    case RECEIVE_LATEST_USER_QUIZZES:
      return [ ...action.quizzes, ...state ]
    default:
      return state
  }
}

export default userQuizzes
