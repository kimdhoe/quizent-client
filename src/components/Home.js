import React       from 'react'
import { connect } from 'react-redux'

import UserBox                 from './UserBox'
import QuizInput               from './QuizInput'
import Timeline                from './Timeline'
import { fetchMe, createQuiz } from '../actions/me'

class Home extends React.Component {
  static propTypes = { isUserLoggedIn: React.PropTypes.bool.isRequired
                     }

  componentWillMount () {
    if (this.props.isUserLoggedIn)
      this.props.fetchMe()
  }

  render () {
    const { me, myQuizzes, isUserLoggedIn, isFetching, quizzes, createQuiz } = this.props

    if (!isUserLoggedIn)
      return (
        <div>
          <p>Login required.</p>
        </div>
      )

    return (
      <div>
        <UserBox
          isFetching={isFetching}
          isMe={true}
          user={me}
          buttonText=""
          toggleFollow={()=>{}}
        />

        <QuizInput createQuiz={createQuiz} />

        <Timeline
          quizzes={myQuizzes}
        />
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

export default connect(mapStateToProps, { fetchMe, createQuiz })(Home)
