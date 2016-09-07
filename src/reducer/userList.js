import { RECEIVE_USERS
       , FOLLOWED
       , UNFOLLOWED } from '../constants'

const userList = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.userList
    case FOLLOWED:
      return state.map( user => user._id === action.id
                                  ? { ...user, followed: true }
                                  : user
                      )
    case UNFOLLOWED:
      return state.map( user => user._id === action.id
                                  ? { ...user, followed: false }
                                  : user
                      )
    default:
      return state
  }
}

export default userList
