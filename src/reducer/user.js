import { RECEIVE_USER
       , FOLLOWED
       , UNFOLLOWED } from '../constants'

const user = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case FOLLOWED:
      return { ...state, followed: true }
    case UNFOLLOWED:
      return { ...state, followed: false }
    default:
      return state
  }
}

export default user
