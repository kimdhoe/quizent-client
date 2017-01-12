import React       from 'react'
import { connect } from 'react-redux'

import UserBox          from './UserBox'
import Timeline         from './Timeline'
import { fetchUser }    from '../actions/user'
import { submitAnswer } from '../actions/submit'
import { deleteQuiz }   from '../actions/quiz'

class Me extends React.PureComponent {
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

  componentDidMount () {
    const intervalID = this.props.installPolling(this.props.username)

    this.setState({ intervalID })
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalID)
  }

  render () {
    const { isMe
          , user
          , username
          , userQuizzes
          , requestFollow
          , requestUnfollow
          , handleDelete
          , submitAnswer } = this.props

    return (
      <div className="Grid">
        <div className="Grid-cell size-grande-4of12">
          <UserBox
            isMe={isMe}
            user={user}
            buttonText=''
            toggleFollow={requestFollow}
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

const pollingInstaller = dispatch => username => {
  dispatch(fetchUser(username))

  return setInterval( () => dispatch(fetchUser(username))
                    , 20000
                    )
}

const noop = () => {}

const mapDispatchToProps = dispatch => (
  { installPolling:  pollingInstaller(dispatch)
  , requestFollow:   noop
  , requestUnfollow: noop
  , handleDelete:    id => dispatch(deleteQuiz(id))
  , submitAnswer:    payload => dispatch(submitAnswer(payload))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Me)
