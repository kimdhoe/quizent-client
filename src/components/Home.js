import React       from 'react'
import { connect } from 'react-redux'

import Greetings               from './Greetings'
import UserBox                 from './UserBox'
import QuizInput               from './QuizInput'
import Timeline                from './Timeline'
import { fetchMe, createQuiz } from '../actions/me'

class Home extends React.Component {
  static propTypes = { isUserLoggedIn: React.PropTypes.bool.isRequired
                     , isFetching:     React.PropTypes.bool.isRequired
                     , me:             React.PropTypes.object.isRequired
                     , myQuizzes:      React.PropTypes.array.isRequired
                     , createQuiz:     React.PropTypes.func.isRequired
                     , installPolling: React.PropTypes.func.isRequired
                     }

  constructor () {
    super()
    this.state = { intervalID: null }
  }

  componentWillMount () {
    if (this.props.isUserLoggedIn)
      this.setState({ intervalID: this.props.installPolling() })
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalID)
  }

  render () {
    const { me, myQuizzes, isUserLoggedIn, isFetching, createQuiz } = this.props

    if (!isUserLoggedIn)
      return <Greetings />

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

          <QuizInput createQuiz={createQuiz} />
        </div>


        <div className="Grid-cell size-grande-8of12">
          <Timeline quizzes={myQuizzes} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ isUserLoggedIn, isFetching, me, myQuizzes }) => (
  { isUserLoggedIn
  , isFetching
  , me
  , myQuizzes
  }
)

const pollingInstaller = dispatch => () => {
    dispatch(fetchMe())

    return setInterval( () => dispatch(fetchMe())
                      , 10000
                      )
  }

const mapDispatchToProps = dispatch => (
  { createQuiz:     quiz => dispatch(createQuiz(quiz))
  , installPolling: pollingInstaller(dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
