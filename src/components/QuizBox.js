import React    from 'react'
import { Link } from 'react-router'
import moment   from 'moment'

import ShortAnswerForm     from './ShortAnswerForm'
import MultipleChoiceForm from './MultipleChoiceForm'
import Loading from './Loading'
import GradeBox from './GradeBox'

class QuizBox extends React.Component {
  static propTypes = { quiz:         React.PropTypes.object.isRequired
                     , isMyQuiz:     React.PropTypes.bool.isRequired
                     , handleDelete: React.PropTypes.func.isRequired
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

  onDeleteButtonClick () {
    console.log(this.props.quiz)

    this.setState({ isLoading: true })

    this.props.handleDelete(this.props.quiz._id)
      .catch(err => this.setState({ isLoading: false }))
  }

  submitAnswer (answer) {
    const payload = { id: this.props.quiz._id
                    , answer
                    }

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

  handleSubmit1 (e) {
    e.preventDefault()
    this.setState({ isDirty: false, isLoading: true })
    this.submitAnswer(this.state.answer.trim()
)
  }

  handleSubmit2 (choice) {
    this.setState({ answer: choice, isDirty: false, isLoading: true })
    this.submitAnswer(choice.trim())
  }

  handleChange (e) {
    this.setState({ answer: e.target.value })
  }

  render() {
    const { quiz, isMyQuiz } = this.props

    return (
      <div className="QuizBox">
        <header className="QuizBox-header">
          <div className="QuizBox-loader">
            {this.state.isLoading && <Loading /> }
          </div>

          <Link className="QuizBox-names" to={`/user/${quiz.author.username}`}>
            <span className="QuizBox-fullname">{quiz.author.fullname}</span>
            <span className="QuizBox-username"> @{quiz.author.username}</span>
          </Link>

          <span className="QuizBox-timestamp">
            {moment(quiz.createdAt).fromNow()}
          </span>

          {isMyQuiz &&
            <p className="QuizBox-control">
              <button className="Button"
                type="button"
                onClick={this.onDeleteButtonClick.bind(this)}
              >
                delete
              </button>
            </p>
          }
        </header>

        <div className="QuizBox-body">
          <p className="QuizBox-question">{quiz.question}</p>

          <div className="QuizBox-answer">
            {quiz.isShortAnswer
              ? <ShortAnswerForm
                  value={this.state.answer}
                  placeholder="Enter your answer here."
                  isLoading={this.state.isLoading}
                  onChange={this.handleChange.bind(this)}
                  onSubmit={this.handleSubmit1.bind(this)}
                />
              : <MultipleChoiceForm
                  choices={quiz.choices}
                  answer={this.state.answer}
                  isLoading={this.state.isLoading}
                  handleSubmit={this.handleSubmit2.bind(this)}
                />
            }
          </div>

        </div>

        <div className="QuizBox-footer">
          <GradeBox
            isDirty={this.state.isDirty}
            isCorrect={this.state.isCorrect}
          />
        </div>

      </div>
    )
  }
}

export default QuizBox
