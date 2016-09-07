import { connect } from 'react-redux'

import UserList            from '../components/UserList'
import { fetchUsers }      from '../actions/userList'
import { requestFollow
       , requestUnfollow } from '../actions/following'

const mapStateToProps = ({ username, userList, isFetching }) => (
  { userList
  , isFetching
  , username
  }
)

const mapDispatchToProps = dispatch => (
  { fetchUsers:      () => dispatch(fetchUsers())
  , requestFollow:   id => dispatch(requestFollow(id))
  , requestUnfollow: id => dispatch(requestUnfollow(id))
  }
)

const UserListContainer = connect(mapStateToProps, mapDispatchToProps)(UserList)

export default UserListContainer
