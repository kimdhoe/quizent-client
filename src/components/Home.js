import React from 'react'
import { connect } from 'react-redux'

import Timeline from './Timeline'
import { fetchQuizzes, createQuiz } from '../actions/quiz'

class Home extends React.Component {
  static propTypes = { isUserLoggedIn: React.PropTypes.bool.isRequired
                     , fetchQuizzes:   React.PropTypes.func.isRequired
                     }

  componentDidMount () {
    if (this.props.isUserLoggedIn) {
      this.props.fetchQuizzes()
    }
  }

  render () {
    const { isUserLoggedIn, isFetching, quizzes, createQuiz } = this.props

    if (!isUserLoggedIn)
      return (
        <div>
          <p>Login required.</p>
        </div>
      )

    return (
      <Timeline
        quizzes={quizzes}
        isFetching={isFetching}
        createQuiz={createQuiz}
      />
    )
  }
}

const mapStateToProps = ({ isUserLoggedIn, isFetching, quizzes }) => (
  { isUserLoggedIn
  , isFetching
  , quizzes
  }
)

export default connect(mapStateToProps, { fetchQuizzes, createQuiz })(Home)
