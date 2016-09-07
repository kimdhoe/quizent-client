import React from 'react'

import QuizBox from './QuizBox'

class Timeline extends React.Component {
  static propTypes = { quizzes:    React.PropTypes.array.isRequired
                     }

  render() {
    const { quizzes } = this.props

    return (
      <div className="Timeline">
        <h2 className="Timeline-title">Timeline</h2>

        <div>
          {quizzes.map(quiz =>
            <QuizBox key={quiz._id} quiz={quiz} />
          )}
        </div>
      </div>
    )
  }
}

export default Timeline
