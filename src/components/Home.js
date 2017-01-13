import React       from 'react'
import { connect } from 'react-redux'

import Greetings        from './Greetings'
import UserBox          from './UserBox'
import QuizInput        from './QuizInput'
import Timeline         from './Timeline'
import { fetchMe
       , checkMyLatestQuizzes
       , fetchMyLatestQuizzes
       , fetchMoreMyQuizzes
       , emptyMyQuizzes
       , createQuiz }   from '../actions/me'
import { submitAnswer } from '../actions/submit'
import { deleteQuiz }   from '../actions/quiz'
import { showNewQuiz }  from '../actions/newQuiz'

class Home extends React.Component {
  static contextTypes = { router: React.PropTypes.object.isRequired }
  static propTypes = { isUserLoggedIn:       React.PropTypes.bool.isRequired
                     , isFetching:           React.PropTypes.bool.isRequired
                     , me:                   React.PropTypes.object.isRequired
                     , myQuizzes:            React.PropTypes.array.isRequired
                     , lastDate:             React.PropTypes.string.isRequired
                     , username:             React.PropTypes.string.isRequired
                     , createQuiz:           React.PropTypes.func.isRequired
                     , handleDelete:         React.PropTypes.func.isRequired
                     , submitAnswer:         React.PropTypes.func.isRequired
                     , fetchMe:              React.PropTypes.func.isRequired
                     , checkMyLatestQuizzes: React.PropTypes.func.isRequired
                     , fetchMyLatestQuizzes: React.PropTypes.func.isRequired
                     , fetchMoreMyQuizzes:   React.PropTypes.func.isRequired
                     , emptyMyQuizzes:       React.PropTypes.func.isRequired
                     , showNewQuiz:          React.PropTypes.func.isRequired
                     }

  constructor () {
    super()
    this.state = { intervalID:  null
                 , nNewQuizzes: 0
                 , firstDate:   ''
                 }
  }

  componentDidMount () {
    if (!this.props.isUserLoggedIn)
      this.context.router.push('/greetings')

    if (this.props.isUserLoggedIn) {
      this.props.fetchMe()
        .then(({ quizzes }) => {
          if (quizzes.length)
            this.setState({ firstDate: quizzes.length
                                         ? quizzes[quizzes.length-1].createdAt
                                         : ''
                         })
        })

      const check = () => {
        this.props.checkMyLatestQuizzes(this.props.lastDate)
          .then(({ nNewQuizzes }) => {
            this.setState({ nNewQuizzes })
          })
      }

      const intervalID = setInterval(check, 10000)

      this.setState({ intervalID })
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalID)
    this.props.emptyMyQuizzes()
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isUserLoggedIn)
      this.context.router.push('/greetings')
  }

  handleUnseenQuizzesClick () {
    return this.props.fetchMyLatestQuizzes(this.props.lastDate)
      .then(({ quizzes }) => {
        this.setState({ nNewQuizzes: 0 })
      })
  }

  onNewQuizClick () {
    this.props.showNewQuiz()
  }

  handleMoreQuizzesClick () {
    return this.props.fetchMoreMyQuizzes(this.state)
      .then(({ quizzes }) => {
        if (quizzes.length)
          this.setState({ firstDate: quizzes[quizzes.length-1].createdAt })
      })
  }

  render () {
    const { me, myQuizzes, isFetching, createQuiz
          , handleDelete, submitAnswer, username } = this.props

    return (
      <div className="Grid">
        <div className="Grid-cell size-grande-4of12">
          <UserBox
            isFetching={isFetching}
            isMe={true}
            user={me}
            buttonText=""
            toggleFollow={()=>{}}
          />


          <div className="Home-newQuiz">
            <p>What's in your mind?</p>
            <button className="Button Button--primary"
              onClick={this.onNewQuizClick.bind(this)}
            >
              [ Post a new quiz! ]
            </button>
          </div>

          {/* <QuizInput createQuiz={createQuiz} /> */}

        </div>

        <div className="Grid-cell size-grande-8of12">
          <Timeline
            username={username}
            quizzes={myQuizzes}
            nNewQuizzes={this.state.nNewQuizzes}
            handleDelete={handleDelete}
            handleUnseenQuizzesClick={this.handleUnseenQuizzesClick.bind(this)}
            handleMoreQuizzesClick={this.handleMoreQuizzesClick.bind(this)}
            submitAnswer={submitAnswer}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ isUserLoggedIn
                         , isFetching
                         , me
                         , myQuizzes
                         , myLastQuizDate
                         , username
                        }) => (
  { isUserLoggedIn
  , isFetching
  , me
  , myQuizzes
  , lastDate: myLastQuizDate
  , username
  }
)

const mapDispatchToProps = dispatch => (
  { createQuiz:           quiz     => dispatch(createQuiz(quiz))
  , handleDelete:         id       => dispatch(deleteQuiz(id))
  , submitAnswer:         payload  => dispatch(submitAnswer(payload))
  , fetchMe:              ()       => dispatch(fetchMe())
  , checkMyLatestQuizzes: lastDate => dispatch(checkMyLatestQuizzes(lastDate))
  , fetchMyLatestQuizzes: lastDate => dispatch(fetchMyLatestQuizzes(lastDate))
  , fetchMoreMyQuizzes:   state    => dispatch(fetchMoreMyQuizzes(state))
  , emptyMyQuizzes:       ()       => dispatch(emptyMyQuizzes())
  , showNewQuiz:          ()       => dispatch(showNewQuiz())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
