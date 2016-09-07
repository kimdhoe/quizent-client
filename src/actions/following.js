import axios from 'axios'

import config           from '../config'
import { FOLLOWED
       , UNFOLLOWED }   from '../constants'
import { fetching
       , doneFetching } from './fetching'

export const fetchFollowing = () => dispatch => {
  dispatch(fetching())

  return axios.get(config.api + '/api/me/following')
}

const followed = id => (
  { type: FOLLOWED
  , id
  }
)

const unfollowed = id => (
  { type: UNFOLLOWED
  , id
  }
)

export const requestFollow = id => dispatch => {
  dispatch(fetching())

  return axios.post(config.api + '/api/me/follow', { id })
    .then(res => {
      dispatch(followed(id))
      dispatch(doneFetching())
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}

export const requestUnfollow = id => dispatch => {
  dispatch(fetching())

  return axios.post(config.api + '/api/me/unfollow', { id })
    .then(res => {
      dispatch(unfollowed(id))
      dispatch(doneFetching())
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}
