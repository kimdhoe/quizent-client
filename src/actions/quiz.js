import axios from 'axios'

import config from '../config'
import { POST_NEW_QUIZ
       , SUCCESS_NEW_QUIZ } from '../constants'

const requestQuizzes = () => (
  { type: 'REQUEST_QUIZZES' }
)

const receiveQuizzes = quizzes => (
  { type: 'RECEIVE_QUIZZES'
  , quizzes
  }
)

export const fetchQuizzes = () => dispatch => {
  dispatch(requestQuizzes)

  axios.get(config.api + '/api/quizzes')
    .then(res => {
      console.log('response', res)
      dispatch(receiveQuizzes(res.data))
    })
    .catch(err => {
      console.dir(err)
    })
}

const postNewQuiz = quiz => (
  { type: POST_NEW_QUIZ
  , quiz
  }
)

const successNewQuiz = quiz => (
  { type: SUCCESS_NEW_QUIZ
  , quiz
  }
)

export const createNewQuiz = quiz => dispatch => {
  dispatch(postNewQuiz)

  axios
    .post(config.api + '/api/quizzes', quiz)
    // .get(config.api + '/api/quizzes')
    .then(res => {
      console.log(res)
      // dispatch(successNewQuiz())
    })
    .catch(err => console.dir(err))
}

