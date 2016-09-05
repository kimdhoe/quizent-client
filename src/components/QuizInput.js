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

    this.setState({ isLoading: true })
    this.props.createQuiz(this.state)
      .then(() => this.setState({ question: '' }))
  }

  onChange (e) {
    this.setState({ question: e.target.value })
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="questionInput">Question</label>
              <textarea
                id="questionInput"
                className="form-control"
                rows="3"
                onChange={this.onChange}
                value={this.state.question}
              >
              </textarea>
            </div>
            <button
              type="submit"
              className="btn btn-default"
              disabled={this.props.isFetching}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default QuizInput
