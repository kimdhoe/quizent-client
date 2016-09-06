import axios from 'axios'

import config            from '../config'
import { RECEIVE_USERS } from '../constants'
import { fetching
       , doneFetching }  from './fetching'

export const fetchUser = () => dispatch =>
  axios.get(config.api + '/api/me')

const receiveUsers = users => (
  { type: RECEIVE_USERS
  , users
  }
)

export const fetchUsers = () => dispatch =>  {
  dispatch(fetching())

  return axios.get(config.api + '/api/users')
    .then(res => {
      dispatch(doneFetching())
      dispatch(receiveUsers(res.data.users))
      console.log(res.data.users)
    })
    .catch(err => console.dir(err))
}

