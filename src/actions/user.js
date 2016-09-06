import axios from 'axios'

import config            from '../config'
import { RECEIVE_USERS } from '../constants'
import { fetching
       , doneFetching }  from './fetching'

export const fetchUser = () => dispatch =>
  axios.get(config.api + '/api/me')

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

