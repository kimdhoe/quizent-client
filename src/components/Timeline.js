import React from 'react'

import QuizBox       from './QuizBox'
import UnseenQuizzes from './UnseenQuizzes'

class Timeline extends React.Component {
  static propTypes = { quizzes:      React.PropTypes.array.isRequired
                     , username:     React.PropTypes.string.isRequired
                     // , nNewQuizzes:  React.PropTypes.number.isRequired
                     , handleDelete: React.PropTypes.func.isRequired
                     , submitAnswer: React.PropTypes.func.isRequired
                     }

  render() {
    const { quizzes
          , username
          , handleDelete
          , submitAnswer
          , handleUnseenQuizzesClick } = this.props

    return (
      <div className="Timeline">
        <h2 className="Timeline-title">Timeline</h2>

        <UnseenQuizzes
          nNewQuizzes={this.props.nNewQuizzes}
          onClick={handleUnseenQuizzesClick}
        />

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
