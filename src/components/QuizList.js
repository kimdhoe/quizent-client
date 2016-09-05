import React from 'react'

import Quiz from './Quiz'

class QuizList extends React.Component {
  static propTypes = { quizzes:      React.PropTypes.array.isRequired }

  render () {
    const { quizzes } = this.props

    return (
      <div>
        {quizzes.map(quiz =>
          <Quiz key={quiz.id} question={quiz.question} />)
        }
      </div>
    )
  }
}

export default QuizList
