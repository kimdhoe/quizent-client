import { RECEIVE_ME } from '../constants'

const me = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ME:
      return action.me
    default:
      return state
  }
}

export default me
