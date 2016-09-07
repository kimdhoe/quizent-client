import React    from 'react'
import { Link } from 'react-router'
import moment   from 'moment'

class QuizBox extends React.Component {
  static propTypes = { quiz: React.PropTypes.object.isRequired }

  render() {
    const { quiz } = this.props

    return (
      <div className="QuizBox">
        <header className="QuizBox-header">
          <strong className="QuizBox-fullname">
            {quiz.author.fullname}
          </strong>
          <Link className="QuizBox-username" to={`/user/${quiz.author.username}`}>
            @{quiz.author.username}
          </Link>
          <span className="QuizBox-timestamp">
            {moment(quiz.createdAt).fromNow()}
          </span>
        </header>

        <div className="QuizBox-body">
          <p className="QuizBox-question">{quiz.question}</p>
        </div>
      </div>
    )
  }
}

export default QuizBox
