import axios from 'axios'

import config from '../config'
import { RECEIVE_ME
       , RECEIVE_MY_QUIZ
       , RECEIVE_MY_QUIZZES } from '../constants'
import { fetching
       , doneFetching }   from './fetching'

const receiveMe = me => (
  { type: RECEIVE_ME
  , me
  }
)

const receiveMyQuzzes = quizzes => (
  { type: RECEIVE_MY_QUIZZES
  , quizzes
  }
)

const receiveMyQuiz = quiz => (
  { type: RECEIVE_MY_QUIZ
  , quiz
  }
)

export const fetchMe = () => dispatch => {
  dispatch(fetching())

  return axios.get(config.api + '/api/me')
    .then(res => {
      dispatch(receiveMe(res.data.me))
      dispatch(receiveMyQuzzes(res.data.quizzes))

      dispatch(doneFetching())
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}

export const createQuiz = quiz => dispatch => {
  dispatch(fetching())

  return axios
    .post(config.api + '/api/quizzes', quiz)
    .then(res => {
      dispatch(receiveMyQuiz(res.data))
      dispatch(doneFetching())
    })
    .catch(err => {
      console.dir(err)
      dispatch(doneFetching())
    })
}

