import React from 'react'

import QuizBox from './QuizBox'

class Timeline extends React.Component {
  static propTypes = { quizzes:      React.PropTypes.array.isRequired
                     , username:     React.PropTypes.string.isRequired
                     , handleDelete: React.PropTypes.func.isRequired
                     , submitAnswer: React.PropTypes.func.isRequired
                     }

  render() {
    const { quizzes, username, handleDelete, submitAnswer } = this.props

    return (
      <div className="Timeline">
        <h2 className="Timeline-title">Timeline</h2>

        <div>
          {quizzes.map(quiz =>
            <QuizBox
              key={quiz._id}
              quiz={quiz}
              isMyQuiz={quiz.author.username === username}
              handleDelete={handleDelete}
              submitAnswer={submitAnswer}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Timeline
