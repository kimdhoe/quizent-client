import React    from 'react'
import { Link } from 'react-router'
import moment   from 'moment'

import QuizSubmitForm from './QuizSubmitForm'

class QuizBox extends React.Component {
  static propTypes = { quiz:         React.PropTypes.object.isRequired
                     , submitAnswer: React.PropTypes.func.isRequired
                     }

  constructor () {
    super()
    this.state = { answer:    ''
                 , isLoading: false
                 , isDirty:   false
                 , isCorrect: false
                 }
  }

  handleSubmit (e) {
    e.preventDefault()

    const payload = { id:     this.props.quiz._id
                    , answer: this.state.answer.trim()
                    }

    this.setState({ isLoading: true })

    this.props.submitAnswer(payload)
      .then(({ grade }) => {
        this.setState({ isLoading: false
                      , isDirty:   true
                      , isCorrect: grade.isCorrect
                      }
                     )
      })
      .catch(err => {
        console.error(err)
        this.setState({ isLoading: false })
      })
  }

  handleChange (e) {
    this.setState({ answer: e.target.value })
  }

  render() {
    const { quiz } = this.props

    return (
      <div className="QuizBox">
        <header className="QuizBox-header">
          <Link className="QuizBox-names" to={`/user/${quiz.author.username}`}>
            <strong className="QuizBox-fullname">{quiz.author.fullname}</strong>
            <span className="QuizBox-username"> @{quiz.author.username}</span>
          </Link>

          <span className="QuizBox-timestamp">
            {moment(quiz.createdAt).fromNow()}
          </span>
        </header>

        <div className="QuizBox-body">
          <p className="QuizBox-question">{quiz.question}</p>

          <div className="QuizBox-answer">
            <QuizSubmitForm
              value={this.state.answer}
              placeholder="Enter your answer here."
              isLoading={this.state.isLoading}
              onChange={this.handleChange.bind(this)}
              onSubmit={this.handleSubmit.bind(this)}
            />
          </div>

          <div className="QuizBox-grade">
            {this.state.isDirty &&
              (this.state.isCorrect
                ? <p className="QuizBox-gradeText is-correct">Good job!</p>
                : <p className="QuizBox-gradeText is-wrong">Try again.</p>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default QuizBox
