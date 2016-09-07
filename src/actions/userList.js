import axios from 'axios'

import config             from '../config'
import { RECEIVE_USERS }  from '../constants'
import { fetching
       , doneFetching }   from './fetching'

const receiveUsers = userList => (
  { type: RECEIVE_USERS
  , userList
  }
)

export const fetchUsers = () => dispatch =>  {
  dispatch(fetching())

  return axios.get(config.api + '/api/users')
    .then(res => {
      dispatch(receiveUsers(res.data.users))
      dispatch(doneFetching())

      console.log(res)
    })
}

