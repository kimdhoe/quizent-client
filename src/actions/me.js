import axios from 'axios'

import config               from '../config'
import { RECEIVE_ME
       , RECEIVE_MY_QUIZ
       , RECEIVE_MY_QUIZZES
       , RECEIVE_MY_LATEST_QUIZZES
       , EMPTY_MY_QUIZZES } from '../constants'
import { fetching
       , doneFetching }     from './fetching'

const receiveMe = me => (
  { type: RECEIVE_ME
  , me
  }
)

const receiveMyQuzzes = quizzes => (
  { type: RECEIVE_MY_QUIZZES
  , quizzes
  }
)

const receiveMyQuiz = quiz => (
  { type: RECEIVE_MY_QUIZ
  , quiz
  }
)

export const checkMyLatestQuizzes = ({ lastDate }) => dispatch => {
  dispatch(fetching())

  return axios.get( config.api + '/api/me/check'
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

const receiveMyLatestQuizzes = quizzes => (
  { type: RECEIVE_MY_LATEST_QUIZZES
  , quizzes
  }
)

export const fetchMyLatestQuizzes = ({ lastDate }) => dispatch => {
  dispatch(fetching())

  return axios.get( config.api + '/api/me/latest'
                  , { params: { lastDate } }
                  )
    .then(res => {
      dispatch(receiveMyLatestQuizzes(res.data.quizzes))
      dispatch(doneFetching())

      return res.data
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}

export const fetchMoreMyQuizzes = ({ firstDate }) => dispatch => {
  dispatch(fetching())

  return axios.get( config.api + '/api/me/more'
                  , { params: { firstDate } }
                  )
    .then(res => {
      dispatch(receiveMyQuzzes(res.data.quizzes))
      dispatch(doneFetching())

      return res.data
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}

export const fetchMe = () => dispatch => {
  dispatch(fetching())

  return axios.get(config.api + '/api/me')
    .then(res => {
      dispatch(receiveMe(res.data.me))
      dispatch(receiveMyQuzzes(res.data.quizzes))

      dispatch(doneFetching())

      return res.data
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)
    })
}

export const createQuiz = quiz => dispatch => {
  dispatch(fetching())

  return axios
    .post(config.api + '/api/quizzes', quiz)
    .then(res => {
      dispatch(receiveMyQuiz(res.data))
      dispatch(doneFetching())
    })
    .catch(err => {
      console.dir(err)
      dispatch(doneFetching())
      throw err
    })
}


export const emptyMyQuizzes = () => (
  { type: EMPTY_MY_QUIZZES }
)
