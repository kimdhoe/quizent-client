import { connect } from 'react-redux'

import UserList            from '../components/UserList'
import { fetchUsers }      from '../actions/user'
import { fetchFollowing
       , requestFollow
       , requestUnfollow } from '../actions/following'

const mapStateToProps = ({ username, isFetching }) => (
  { currentUsername: username
  , isFetching
  }
)

const mapDispatchToProps = dispatch => (
  { fetchUsers:      () => dispatch(fetchUsers())
  , fetchFollowing:  () => dispatch(fetchFollowing())
  , requestFollow:   id => dispatch(requestFollow(id))
  , requestUnfollow: id => dispatch(requestUnfollow(id))
  , dispatch
  }
)

const UserListContainer = connect(mapStateToProps, mapDispatchToProps)(UserList)

export default UserListContainer
