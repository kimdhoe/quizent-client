import axios from 'axios'

import config               from '../config'
import { RECEIVE_SOLUTION } from '../constants'
import { fetching
       , doneFetching }     from './fetching'

export const submitAnswer = ({ id, answer }) => dispatch => {
  dispatch(fetching())

  return axios.post(config.api + `/api/quizzes/${id}/submit`, { answer })
    .then(res => {
      console.log(res.data)
      dispatch(doneFetching())
      return res.data
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
      throw err
    })
}
