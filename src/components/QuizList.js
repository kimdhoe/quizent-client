import React from 'react'

import Quiz from './Quiz'

class QuizList extends React.Component {
  static propTypes = { quizzes:      React.PropTypes.array.isRequired }

  render () {
    const { quizzes } = this.props

    return (
      <div className="row quizList">
        {quizzes.map(quiz =>
          <Quiz
            key={quiz._id}
            question={quiz.question}
            author={quiz.author}
            createdAt={quiz.createdAt}
          />
        )}
      </div>
    )
  }
}

export default QuizList
