import axios from 'axios'

import config from '../config'
import { FETCHING
       , DONE_FETCHING
       , RECEIVE_QUIZ } from '../constants'

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

const fetching = () => (
  { type: FETCHING }
)

const receiveQuiz = quiz => (
  { type: RECEIVE_QUIZ
  , quiz
  }
)

const doneFetching = () => (
  { type: DONE_FETCHING }
)

export const createQuiz = quiz => dispatch => {
  dispatch(fetching())

  return axios
    .post(config.api + '/api/quizzes', quiz)
    .then(res => {
      dispatch(receiveQuiz(res.data))
      dispatch(doneFetching())
    })
    .catch(err => {
      console.dir(err)
      dispatch(doneFetching())
    })
}

