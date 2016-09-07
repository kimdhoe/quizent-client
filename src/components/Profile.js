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
                     , fetchUser:       React.PropTypes.func.isRequired
                     , requestFollow:   React.PropTypes.func.isRequired
                     , requestUnfollow: React.PropTypes.func.isRequired
                     }

  componentWillMount () {
    this.props.fetchUser(this.props.params.username)
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

export default connect( mapStateToProps
                      , { fetchUser
                        , requestFollow
                        , requestUnfollow
                        }
                      )(Profile)
