import React       from 'react'
import { connect } from 'react-redux'

import UserBox             from './UserBox'
import Timeline            from './Timeline'
import { fetchUser }       from '../actions/user'
import { requestFollow
       , requestUnfollow } from '../actions/following'
import { submitAnswer }    from '../actions/submit'
import { deleteQuiz }      from '../actions/quiz'

class Profile extends React.Component {
  static propTypes = { isMe:            React.PropTypes.bool.isRequired
                     , user:            React.PropTypes.object.isRequired
                     , username:        React.PropTypes.string.isRequired
                     , userQuizzes:     React.PropTypes.array.isRequired
                     , installPolling:  React.PropTypes.func.isRequired
                     , requestFollow:   React.PropTypes.func.isRequired
                     , requestUnfollow: React.PropTypes.func.isRequired
                     , handleDelete:    React.PropTypes.func.isRequired
                     , submitAnswer:    React.PropTypes.func.isRequired
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
    const { isMe
          , user
          , username
          , userQuizzes
          , requestUnfollow
          , requestFollow
          , handleDelete
          , submitAnswer } = this.props

    return (
      <div className="Grid">
        <div className="Grid-cell size-grande-4of12">
          <UserBox
            isMe={isMe}
            user={user}
            buttonText={user.followed ? "Unfollow" : "Follow"}
            toggleFollow={user.followed
                            ? () => this.props.requestUnfollow(user._id)
                            : () => this.props.requestFollow(user._id)
                         }
          />
        </div>

        <div className="Grid-cell size-grande-8of12">
          <Timeline
            username={username}
            quizzes={userQuizzes}
            handleDelete={handleDelete}
            submitAnswer={submitAnswer}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ username, user, userQuizzes }) => (
  { isMe: username === user.username
  , user
  , username
  , userQuizzes
  }
)

// Given a Redux dispatch function, produces a user-polling installer
// procedure, which returns an interval-ID for clearing on unmounting.
const pollingInstaller = dispatch => username => {
  dispatch(fetchUser(username))

  return setInterval( () => dispatch(fetchUser(username))
                    , 20000
                    )
}

const mapDispatchToProps = dispatch => (
  { installPolling:  pollingInstaller(dispatch)
  , requestFollow:   id => dispatch(requestFollow(id))
  , requestUnfollow: id => dispatch(requestUnfollow(id))
  , handleDelete:    id => dispatch(deleteQuiz(id))
  , submitAnswer:    payload => dispatch(submitAnswer(payload))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
