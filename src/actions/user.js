import axios from 'axios'

import config                          from '../config'
import { RECEIVE_USER
       , RECEIVE_USER_QUIZZES
       , RECEIVE_LATEST_USER_QUIZZES } from '../constants'
import { fetching
       , doneFetching }                from './fetching'

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

  return axios.get(config.api + '/api/users/' + username)
    .then(res => {
      dispatch(receiveUser(res.data.user))
      dispatch(receiveUserQuizzes(res.data.quizzes))
      dispatch(doneFetching())
      return res.data
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}

const receiveLatestUserQuizzes = quizzes => (
  { type: RECEIVE_LATEST_USER_QUIZZES
  , quizzes
  }
)

export const fetchLatestUserQuizzes = ({ username, lastDate }) => dispatch => {
  dispatch(fetching())

  return axios.get( config.api + '/api/users/' + username + '/latest'
                  , { params: { lastDate } }
                  )
    .then(res => {
      dispatch(receiveLatestUserQuizzes(res.data.quizzes))
      dispatch(doneFetching())

      return res.data
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}

export const checkLatestUserQuizzes = ({ username, lastDate }) => dispatch => {
  dispatch(fetching())

  return axios.get( config.api + '/api/users/' + username + '/check'
                  , { params: { lastDate } }
                  )
    .then(res => {
      dispatch(doneFetching())
      return res.data
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}

export const fetchMoreUserQuizzes = ({ username, firstDate }) => dispatch => {
  dispatch(fetching())

  return axios.get( config.api + '/api/users/' + username + '/more'
                  , { params: { firstDate } }
                  )
    .then(res => {
      dispatch(doneFetching())
      dispatch(receiveUserQuizzes(res.data.quizzes))
      return res.data
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}
