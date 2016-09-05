import { FETCHING
  , DONE_FETCHING } from '../constants'

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCHING:      return true
    case DONE_FETCHING: return false
    default:            return state
  }
}

export default isFetching
