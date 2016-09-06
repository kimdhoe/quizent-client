import React from 'react'
import { connect } from 'react-redux'

import User from './User'
import { fetchUsers } from '../actions/user'

class UserList extends React.Component {
  static propTypes = { users:      React.PropTypes.array.isRequired
                     , fetchUsers: React.PropTypes.func.isRequired
                     }

  componentDidMount () {
    this.props.fetchUsers()
  }

  render () {
    const { users } = this.props

    return (
      <div className="UserList">
        <h2 className="UserList-title">User List</h2>

        {users.map(user =>
          <User
            key={user._id}
            fullname={user.fullname}
            username={user.username}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => (
  { users }
)

export default connect(mapStateToProps, { fetchUsers })(UserList)
