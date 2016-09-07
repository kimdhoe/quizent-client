import { RECEIVE_USER } from '../constants'

const shownUser = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER: return action.user
    default:           return state
  }
}

export default shownUser
