import React       from 'react'
import { connect } from 'react-redux'

import UserBox             from './UserBox'

class UserList extends React.Component {
  static propTypes = { fetchUsers:    React.PropTypes.func.isRequired
                     , requestFollow: React.PropTypes.func.isRequired
                     , requestFollow: React.PropTypes.func.isRequired
                     , userList:      React.PropTypes.array.isRequired
                     , username:      React.PropTypes.string.isRequired
                     }

  componentWillMount () {
    this.props.fetchUsers()
  }

  render () {
    const { userList, username } = this.props

    return (
      <div className="UserList container">
        <h2 className="UserList-title">User List</h2>

        {userList.map(user =>
          <UserBox
            key={user._id}
            isMe={username === user.username}
            user={user}
            buttonText={user.followed ? "Unfollow" : "Follow"}
            toggleFollow={user.followed
                            ? () => this.props.requestUnfollow(user._id)
                            : () => this.props.requestFollow(user._id)
                         }
          />

        )}
      </div>
    )
  }
}

export default UserList
