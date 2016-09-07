import { RECEIVE_USER_QUIZZES } from '../constants'

const userQuizzes = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USER_QUIZZES:
      return action.quizzes
    default:
      return state
  }
}

export default userQuizzes
