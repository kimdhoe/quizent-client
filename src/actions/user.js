import axios from 'axios'

import config             from '../config'
import { RECEIVE_USER
       , RECEIVE_USERS }  from '../constants'
import { fetching
       , doneFetching }   from './fetching'
import { receiveQuizzes } from './quiz'

const receiveUser = user => (
  { type: RECEIVE_USER
  , user
  }
)

export const fetchUser = username => dispatch =>
  axios.get(config.api + '/api/users/' + username)
    .then(res => {
      dispatch(doneFetching())
      dispatch(receiveUser(res.data.user))
      dispatch(receiveQuizzes(res.data.quizzes))
      return res
    })
    .catch(err => {
      dispatch(doneFetching())
      console.dir(err)
    })

const receiveUsers = (users, currentUserId) => (
  { type: RECEIVE_USERS
  , users
  , currentUserId
  }
)

export const fetchUsers = () => dispatch =>  {
  dispatch(fetching())

  return axios.get(config.api + '/api/users')
}

