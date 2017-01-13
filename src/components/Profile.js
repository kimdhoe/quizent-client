import React       from 'react'
import { Link }    from 'react-router'
import { connect } from 'react-redux'

import UserBox             from './UserBox'
import Timeline            from './Timeline'
import { fetchUser
       , checkLatestUserQuizzes
       , fetchLatestUserQuizzes
       , fetchMoreUserQuizzes
       , emptyUserQuizzes
       }                   from '../actions/user'
import { requestFollow
       , requestUnfollow } from '../actions/following'
import { submitAnswer }    from '../actions/submit'
import { deleteQuiz }      from '../actions/quiz'

class Profile extends React.Component {
  static propTypes = { isMe:                 React.PropTypes.bool.isRequired
                     , isUserLoggedIn:       React.PropTypes.bool.isRequired
                     , user:                 React.PropTypes.object.isRequired
                     , username:             React.PropTypes.string.isRequired
                     , userLastQuizDate:     React.PropTypes.string.isRequired
                     , userQuizzes:          React.PropTypes.array.isRequired
                     , fetchUser:            React.PropTypes.func.isRequired
                     , requestFollow:        React.PropTypes.func.isRequired
                     , requestUnfollow:      React.PropTypes.func.isRequired
                     , handleDelete:         React.PropTypes.func.isRequired
                     , fetchMoreUserQuizzes: React.PropTypes.func.isRequired
                     , submitAnswer:         React.PropTypes.func.isRequired
                     , emptyUserQuizzes:     React.PropTypes.func.isRequired
                     }

  constructor () {
    super()
    this.state = { intervalID:  null
                 , username:    ''
                 , firstDate:   ''
                 , nNewQuizzes: 0
                 }

    this.handleUnseenQuizzesClick = this.handleUnseenQuizzesClick.bind(this)
    this.handleMoreQuizzesClick   = this.handleMoreQuizzesClick.bind(this)
  }

  componentDidMount () {
    const { username } = this.props.params

    this.props.fetchUser(username)
      .then(({ user, quizzes }) => {
        this.setState({ username:  user.username
                      , firstDate: quizzes[quizzes.length-1].createdAt
                      }
                     )
      })

    const check = () => {
      this.props.checkLatestUserQuizzes({ username: this.state.username
                                        , lastDate: this.props.userLastQuizDate
                                        }
                                       )
        .then(({ nNewQuizzes }) => {
          this.setState({ nNewQuizzes })
        })
    }

    const intervalID = setInterval(check, 5000)

    this.setState({ intervalID })
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalID)
    this.props.emptyUserQuizzes()
  }

  handleUnseenQuizzesClick () {
    return this.props.fetchLatestUserQuizzes(
             { username: this.state.username
             , lastDate: this.props.userLastQuizDate
             }
           )
      .then(({ quizzes }) => {
        this.setState({ nNewQuizzes: 0
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
          , isUserLoggedIn
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
            isUserLoggedIn={isUserLoggedIn}
            user={user}
            buttonText={user.followed ? "Unfollow" : "Follow"}
            toggleFollow={user.followed
                            ? () => this.props.requestUnfollow(user._id)
                            : () => this.props.requestFollow(user._id)
                         }
          />

          {!isUserLoggedIn &&
            <p>
              <Link to="/signup">Sign up </Link>
              now to show your own intereting quizzes!
            </p>
          }
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

const mapStateToProps = ({ isUserLoggedIn
                         , username
                         , userLastQuizDate
                         , user
                         , userQuizzes
                        }) => (
  { isMe: username === user.username
  , isUserLoggedIn
  , user
  , username
  , userLastQuizDate
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
  , emptyUserQuizzes:       () => dispatch(emptyUserQuizzes())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
