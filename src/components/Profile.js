import React       from 'react'
import { connect } from 'react-redux'

import UserBox             from './UserBox'
import Timeline            from './Timeline'
import { fetchUser
       , checkLatestUserQuizzes
       , fetchLatestUserQuizzes
       , fetchMoreUserQuizzes
       }                   from '../actions/user'
import { requestFollow
       , requestUnfollow } from '../actions/following'
import { submitAnswer }    from '../actions/submit'
import { deleteQuiz }      from '../actions/quiz'

class Profile extends React.Component {
  static propTypes = { isMe:                 React.PropTypes.bool.isRequired
                     , user:                 React.PropTypes.object.isRequired
                     , username:             React.PropTypes.string.isRequired
                     , userQuizzes:          React.PropTypes.array.isRequired
                     , fetchUser:            React.PropTypes.func.isRequired
                     , requestFollow:        React.PropTypes.func.isRequired
                     , requestUnfollow:      React.PropTypes.func.isRequired
                     , handleDelete:         React.PropTypes.func.isRequired
                     , fetchMoreUserQuizzes: React.PropTypes.func.isRequired
                     , submitAnswer:         React.PropTypes.func.isRequired
                     }

  constructor () {
    super()
    this.state = { intervalID:  null
                 , username:    ''
                 , lastDate:    ''
                 , firstDate:   ''
                 , nNewQuizzes: 0
                 }
    this.handleUnseenQuizzesClick = this.handleUnseenQuizzesClick.bind(this)
    this.handleMoreQuizzesClick = this.handleMoreQuizzesClick.bind(this)
  }

  componentDidMount () {
    this.props.fetchUser(this.props.params.username)
      .then(({ user, quizzes }) => {
        this.setState({ username:  user.username
                      , lastDate:  quizzes[0].createdAt
                      , firstDate: quizzes[quizzes.length-1].createdAt
                      }
                     )
      })

    const check = () => {
      this.props.checkLatestUserQuizzes(this.state)
        .then(({ nNewQuizzes }) => {
          this.setState({ nNewQuizzes })
        })
    }

    const intervalID = setInterval(check, 5000)

    this.setState({ intervalID })
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalID)
  }

  handleUnseenQuizzesClick () {
    return this.props.fetchLatestUserQuizzes(this.state)
      .then(({ quizzes }) => {
        this.setState({ nNewQuizzes: 0
                      , lastDate:    quizzes[0].createdAt
                      }
                     )
      })
  }

  handleMoreQuizzesClick () {
    return this.props.fetchMoreUserQuizzes(this.state)
      .then(({ quizzes }) => {
        if (quizzes.length)
          this.setState({ firstDate: quizzes[quizzes.length-1].createdAt })
      })
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
            nNewQuizzes={this.state.nNewQuizzes}
            handleDelete={handleDelete}
            handleUnseenQuizzesClick={this.handleUnseenQuizzesClick}
            handleMoreQuizzesClick={this.handleMoreQuizzesClick}
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

const mapDispatchToProps = dispatch => (
  { requestFollow:          id => dispatch(requestFollow(id))
  , requestUnfollow:        id => dispatch(requestUnfollow(id))
  , handleDelete:           id => dispatch(deleteQuiz(id))
  , submitAnswer:           payload => dispatch(submitAnswer(payload))
  , fetchUser:              username => dispatch(fetchUser(username))
  , checkLatestUserQuizzes: state => dispatch(checkLatestUserQuizzes(state))
  , fetchLatestUserQuizzes: state => dispatch(fetchLatestUserQuizzes(state))
  , fetchMoreUserQuizzes:   state => dispatch(fetchMoreUserQuizzes(state))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
