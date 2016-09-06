import React from 'react'

class QuizInput extends React.Component {
  static propTypes = { createQuiz: React.PropTypes.func.isRequired }

  constructor (props) {
    super(props)
    this.state = { question:  ''
                 }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()

    this.props.createQuiz(this.state)
      .then(() => this.setState({ question: '' }))
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
        <div className="QuizInput">
          <form className="QuizInput-form" onSubmit={this.onSubmit}>
            <div className="Field QuizInput-question">
              <label
                className="QuizInput-questionLabel"
                htmlFor="questionInput"
              >
                Question
              </label>
              <textarea
                className="QuizInput-questionTextarea"
                id="questionInput"
                name="question"
                rows="2"
                onChange={this.onChange}
                value={this.state.question}
                placeholder="Solve this"
              >
              </textarea>
            </div>

            <button
              type="submit"
              className="QuizInput-button Button Button--primary"
              disabled={this.props.isFetching}
            >
              Create
            </button>
          </form>
        </div>
    )
  }
}

export default QuizInput
