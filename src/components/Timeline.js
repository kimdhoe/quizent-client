import React from 'react'

import QuizBox       from './QuizBox'
import UnseenQuizzes from './UnseenQuizzes'
import MoreQuizzes   from './MoreQuizzes'

class Timeline extends React.Component {
  static propTypes = { quizzes:                  React.PropTypes.array.isRequired
                     , username:                 React.PropTypes.string.isRequired
                     , nNewQuizzes:              React.PropTypes.number.isRequired
                     , handleDelete:             React.PropTypes.func.isRequired
                     , handleUnseenQuizzesClick: React.PropTypes.func.isRequired
                     , handleMoreQuizzesClick:   React.PropTypes.func.isRequired
                     , submitAnswer:             React.PropTypes.func.isRequired
                     }

  render() {
    const { quizzes
          , username
          , nNewQuizzes
          , handleDelete
          , submitAnswer
          , handleUnseenQuizzesClick
          , handleMoreQuizzesClick } = this.props

    return (
      <div className="Timeline">
        <h2 className="Timeline-title">Timeline</h2>

        <UnseenQuizzes
          nNewQuizzes={nNewQuizzes}
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

        <MoreQuizzes
          handleClick={handleMoreQuizzesClick}
        />
      </div>
    )
  }
}

export default Timeline
