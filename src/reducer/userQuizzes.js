import { DELETED_QUIZ
       , RECEIVE_USER_QUIZZES } from '../constants'

const userQuizzes = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USER_QUIZZES:
      return action.quizzes
    case DELETED_QUIZ:
      return state.filter(quiz => quiz._id !== action.id)
    default:
      return state
  }
}

export default userQuizzes
