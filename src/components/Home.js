import React from 'react'
import { connect } from 'react-redux'

import QuizList from './QuizList'
import { fetchQuizzes } from '../actions/quiz'

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
    if (!this.props.isUserLoggedIn)
      return (
        <div>
          <p>Login required.</p>
        </div>
      )

    return <QuizList quizzes={this.props.quizzes} />
  }
}

const mapStateToProps = ({ isUserLoggedIn, quizzes }) => (
  { isUserLoggedIn, quizzes: [] }
)

export default connect(mapStateToProps, { fetchQuizzes })(Home)
