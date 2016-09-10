import { SHOW_NEW_QUIZ
       , HIDE_NEW_QUIZ } from '../constants'

const shouldShowNewQuiz = (state = false, action) => {
  switch (action.type) {
    case SHOW_NEW_QUIZ: return true
    case HIDE_NEW_QUIZ: return false
    default:            return state
  }
}

export default shouldShowNewQuiz
