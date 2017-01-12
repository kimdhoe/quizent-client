import { DELETED_QUIZ
       , RECEIVE_MY_QUIZZES
       , RECEIVE_MY_QUIZ } from '../constants'

const myQuizzes = (state = [], action) => {
  console.log(state)
  switch(action.type) {
    case RECEIVE_MY_QUIZZES:
      return action.quizzes
    case RECEIVE_MY_QUIZ:
      return [ action.quiz, ...state ]
    case DELETED_QUIZ:
      return state.filter(quiz => quiz._id !== action.id)
    default:
      return state
  }
}

export default myQuizzes
