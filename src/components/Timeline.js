import React from 'react'

import QuizInput from './QuizInput'
import QuizList from './QuizList'

class Timeline extends React.Component {
  static propTypes = { quizzes:    React.PropTypes.array.isRequired
                     , isFetching: React.PropTypes.bool.isRequired
                     , createQuiz: React.PropTypes.func.isRequired
                     }

  render() {
    const { isFetching, quizzes, createQuiz } = this.props

    return (
      <div className="Timeline container">
        <h2 className="col-md-12">Timeline</h2>
        <div className="col-md-12">
          <QuizInput isFetching={isFetching} createQuiz={createQuiz} />
          <QuizList quizzes={quizzes} />
        </div>
      </div>
    )
  }
}

export default Timeline
