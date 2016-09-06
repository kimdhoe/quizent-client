import axios from 'axios'

import config                from '../config'
import { fetching
       , doneFetching }      from './fetching'

export const fetchFollowing = () => dispatch => {
  dispatch(fetching())

  return axios.get(config.api + '/api/me/following')
}

export const requestFollow = id => dispatch => {
  dispatch(fetching())

  return axios.post(config.api + '/api/me/follow', { id })
}

export const requestUnfollow = id => dispatch => {
  dispatch(fetching())

  return axios.post(config.api + '/api/me/unfollow', { id })
}
