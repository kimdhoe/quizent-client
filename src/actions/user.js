import axios from 'axios'

import config                 from '../config'
import { RECEIVE_USER
       , RECEIVE_USER_QUIZZES
       , RECEIVE_LATEST_USER_QUIZZES
       , EMPTY_USER_QUIZZES } from '../constants'
import { fetching
       , doneFetching }       from './fetching'

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

const receiveLatestUserQuizzes = quizzes => (
  { type: RECEIVE_LATEST_USER_QUIZZES
  , quizzes
  }
)

const updateUserLastQuizDate = lastDate => (
  { type: 'UPDATE_USER_LAST_QUIZ_DATE'
  , lastDate
  }
)

export const emptyUserQuizzes = () => (
  { type: EMPTY_USER_QUIZZES }
)

export const fetchUser = username => dispatch => {
  dispatch(fetching())

  return axios.get(config.api + '/api/users/' + username)
    .then(res => {
      const { user, quizzes } = res.data

      if (quizzes.length)
        dispatch(updateUserLastQuizDate(quizzes[0].createdAt))

      dispatch(receiveUser(user))
      dispatch(receiveUserQuizzes(quizzes))
      dispatch(doneFetching())
      return res.data
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}

export const fetchLatestUserQuizzes = ({ username, lastDate }) => dispatch => {
  dispatch(fetching())

  return axios.get( config.api + '/api/users/' + username + '/latest'
                  , { params: { lastDate } }
                  )
    .then(res => {
      const { quizzes } = res.data

      dispatch(updateUserLastQuizDate(quizzes[0].createdAt))
      dispatch(receiveLatestUserQuizzes(quizzes))
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
