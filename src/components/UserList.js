import React from 'react'
import { connect } from 'react-redux'

import User from './User'
import { doneFetching } from '../actions/fetching'

class UserList extends React.Component {
  static propTypes = { currentUsername: React.PropTypes.string.isRequired
                     , isFetching:      React.PropTypes.bool.isRequired
                     , fetchUsers:      React.PropTypes.func.isRequired
                     , fetchFollowing:  React.PropTypes.func.isRequired
                     , requestFollow:   React.PropTypes.func.isRequired
                     , requestUnfollow: React.PropTypes.func.isRequired
                     }

  constructor (props) {
    super(props)
    this.state = { users:     []
                 , following: []
                 }
    this.handleFollow   = this.handleFollow.bind(this)
    this.handleUnfollow = this.handleUnfollow.bind(this)
  }

  componentDidMount () {
    const { dispatch, fetchUsers, fetchFollowing } = this.props

    fetchUsers()
      .then(res => {
        dispatch(doneFetching())
        this.setState({ users: res.data.users })
      })
      .catch(err => {
        dispatch(doneFetching())
        console.log(err)
      })

    fetchFollowing()
      .then(res => {
        dispatch(doneFetching())
        this.setState({ following: res.data.following })
      })
      .catch(err => {
        dispatch(doneFetching())
        console.log(err)
      })

  }

  handleFollow (id) {
    const { dispatch, requestFollow } = this.props

    requestFollow(id)
      .then(() => {
        dispatch(doneFetching())
        this.setState({ following: [ ...this.state.following, id ] })
      })
      .catch(err => {
        dispatch(doneFetching())
        console.log(err)
      })
  }

  handleUnfollow (id) {
    const { dispatch, requestUnfollow } = this.props

    requestUnfollow(id)
      .then(() => {
        dispatch(doneFetching())
        this.setState({ following: this.state.following.filter(x => x !== id) })
      })
      .catch(err => {
        dispatch(doneFetching())
        console.log(err)
      })
  }

  render () {
    return (
      <div className="UserList">
        <h2 className="UserList-title">User List</h2>

        {this.state.users.map(user => {
          const followed = this.state.following.indexOf(user._id) >= 0

          return (
            <User
              key={user._id}
              isFetching={this.props.isFetching}
              user={user}
              isMe={this.props.currentUsername === user.username}
              toggleFollow={followed ? this.handleUnfollow : this.handleFollow}
              buttonText={followed ? "Unfollow" : "Follow"}
            />
          )
        })}
      </div>
    )
  }
}

export default UserList
