 import React      from 'react'
 import classnames from 'classnames'

 import Loading from './Loading'

class QuizInput extends React.Component {
  static propTypes = { createQuiz: React.PropTypes.func.isRequired }

  constructor () {
    super()
    this.state = { question:  ''
                 , answer:    ''
                 , errors:    {}
                 , isLoading: false
                 }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()

    this.setState({ isLoading: true })

    this.props.createQuiz(this.state)
      .then(() => {
        this.setState({ question: '', answer: '', errors: {}, isLoading: false })
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors, isLoading: false })
      })
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const questionClassName =
      classnames( "Field QuizInput-question"
                , { "Field--error": this.state.errors.answer }
                )
    const answerClassName =
      classnames( "Field QuizInput-answer"
                , { "Field--error": this.state.errors.answer }
                )

    return (
        <div className="QuizInput">
          <form className="QuizInput-form" onSubmit={this.onSubmit}>
            <div className={questionClassName}>
              <label className="QuizInput-questionLabel" htmlFor="questionInput">
                Question
              </label>

              <textarea
                className="QuizInput-questionTextarea"
                id="questionInput"
                name="question"
                rows="3"
                onChange={this.onChange}
                value={this.state.question}
                placeholder="question"
              >
              </textarea>
            </div>

            <div className={answerClassName}>
              <label className="QuizInput-answerLabel" htmlFor="answerInput">
                Answer
              </label>

              <input
                className="QuizInput-answerInput"
                type="text"
                id="answerInput"
                name="answer"
                onChange={this.onChange}
                value={this.state.answer}
                placeholder="answer"
              />
            </div>

            <button
              type="submit"
              className="QuizInput-button Button Button--primary"
              disabled={this.state.isLoading}
            >
              {this.state.isLoading ? <Loading /> : "Create"}
            </button>
          </form>
        </div>
    )
  }
}

export default QuizInput
