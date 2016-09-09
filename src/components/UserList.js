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

        <div className="Grid">
          {userList.map(user =>
            <div className="Grid-cell size-tall-6of12 size-grande-4of12">
              <div className="u-border u-boxPad">
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
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default UserList
