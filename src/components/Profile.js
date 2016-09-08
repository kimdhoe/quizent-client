import React       from 'react'
import { connect } from 'react-redux'

import UserBox             from './UserBox'
import Timeline            from './Timeline'
import { fetchUser }       from '../actions/user'
import { requestFollow
       , requestUnfollow } from '../actions/following'

class Profile extends React.Component {
  static propTypes = { isFetching:      React.PropTypes.bool.isRequired
                     , isMe:            React.PropTypes.bool.isRequired
                     , user:            React.PropTypes.object.isRequired
                     , userQuizzes:     React.PropTypes.array.isRequired
                     , installPolling:  React.PropTypes.func.isRequired
                     , requestFollow:   React.PropTypes.func.isRequired
                     , requestUnfollow: React.PropTypes.func.isRequired
                     }

  constructor () {
    super()
    this.state = { intervalID: null }
  }

  componentWillMount () {
    const intervalID = this.props.installPolling(this.props.params.username)

    this.setState({ intervalID: intervalID })
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalID)
  }

  render () {
    const { isFetching
          , isMe
          , user
          , userQuizzes
          , requestUnfollow
          , requestFollow } = this.props

    return (
      <div>
        <UserBox
          isFetching={isFetching}
          isMe={isMe}
          user={user}
          buttonText={user.followed ? "Unfollow" : "Follow"}
          toggleFollow={user.followed
                          ? () => this.props.requestUnfollow(user._id)
                          : () => this.props.requestFollow(user._id)
                       }
        />

        <Timeline
          quizzes={userQuizzes}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ username, isFetching, user, userQuizzes }) => (
  { isMe: username === user.username
  , isFetching
  , user
  , userQuizzes
  }
)

// Given a Redux dispatch function, produces a user-polling installer
// procedure, which returns an interval-ID for clearing on unmounting.
const pollingInstaller = dispatch => username => {
  dispatch(fetchUser(username))

  return setInterval( () => dispatch(fetchUser(username))
                    , 1000
                    )
}

const mapDispatchToProps = dispatch => (
  { installPolling:  pollingInstaller(dispatch)
  , requestFollow:   id => dispatch(requestFollow(id))
  , requestUnfollow: id => dispatch(requestUnfollow(id))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
