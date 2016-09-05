import React from 'react'

import QuizInput from './QuizInput'
import QuizList from './QuizList'

class Timeline extends React.Component {
  static propTypes = { quizzes: React.PropTypes.array.isRequired }

  render() {
    const { isFetching, quizzes, createQuiz } = this.props

    return (
      <div className="row timeline">
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
