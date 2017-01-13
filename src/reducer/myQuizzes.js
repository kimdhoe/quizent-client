import { DELETED_QUIZ
       , RECEIVE_MY_QUIZ
       , RECEIVE_MY_QUIZZES
       , RECEIVE_MY_LATEST_QUIZZES
       , EMPTY_MY_QUIZZES } from '../constants'

const myQuizzes = (state = [], action) => {
  console.log(state)
  switch(action.type) {
    case RECEIVE_MY_QUIZZES:
      return [ ...state, ...action.quizzes ]
    case RECEIVE_MY_QUIZ:
      return [ action.quiz, ...state ]
    case RECEIVE_MY_LATEST_QUIZZES:
      return [ ...action.quizzes, ...state ]
    case DELETED_QUIZ:
      return state.filter(quiz => quiz._id !== action.id)
    case EMPTY_MY_QUIZZES:
      return []
    default:
      return state
  }
}

export default myQuizzes
