import axios from 'axios'

import config           from '../config'
import { fetching
       , doneFetching } from './fetching'
import { DELETED_QUIZ } from '../constants'

const deletedQuiz = id => (
  { type: DELETED_QUIZ
  , id
  }
)

export const deleteQuiz = id => dispatch => {
  dispatch(fetching())

  return axios.delete(config.api + `/api/quizzes/${id}`)
    .then(res => {
      dispatch(doneFetching())
      dispatch(deletedQuiz(id))

      return res.data
    })
    .catch(err => {
      dispatch(doneFetching())
      console.error(err)

      throw err
    })
}
