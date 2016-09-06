import React    from 'react'
import { Link } from 'react-router'
import moment   from 'moment'

class Quiz extends React.Component {
  static propTypes = { quiz: React.PropTypes.object.isRequired }

  render() {
    const { quiz } = this.props

    return (
      <div className="Quiz">
        <header className="Quiz-header">
          <strong className="Quiz-fullname">
            {quiz.author.fullname}
          </strong>
          <Link className="Quiz-username" to={`/user/${quiz.author.username}`}>
            @{quiz.author.username}
          </Link>
          <span className="Quiz-timestamp">
            {moment(quiz.createdAt).fromNow()}
          </span>
        </header>

        <div className="Quiz-body">
          <p className="Quiz-question">{quiz.question}</p>
        </div>
      </div>
    )
  }
}

export default Quiz
