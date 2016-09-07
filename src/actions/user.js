import axios from 'axios'

import config                   from '../config'
import { RECEIVE_USER
       , RECEIVE_USER_QUIZZES } from '../constants'
import { fetching
       , doneFetching }         from './fetching'

const receiveUser = user => (
  { type: RECEIVE_USER
  , user
  }
)

const receiveUserQuizzes = quizzes => (
  { type: RECEIVE_USER_QUIZZES
  , quizzes
  }
)

export const fetchUser = username => dispatch => {
  dispatch(fetching())

  axios.get(config.api + '/api/users/' + username)
    .then(res => {
      console.log(res.data)
      dispatch(receiveUser(res.data.user))
      dispatch(receiveUserQuizzes(res.data.quizzes))

      dispatch(doneFetching())
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}
