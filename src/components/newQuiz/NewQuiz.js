import React                   from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect }             from 'react-redux'
import classnames              from 'classnames'

import { hideNewQuiz
       , setQuestion
       , setAnswer
       , setChoice
       , addNewChoice
       , setSolution
       , setIsShortAnswer
       , removeChoice
       , resetNewQuiz }     from '../../actions/newQuiz'
import { createQuiz }       from '../../actions/me'
import QuizTypeSelection    from './QuizTypeSelection'
import MultipleChoiceFields from './MultipleChoiceFields'
import Loading              from '../Loading'

class NewQuiz extends React.Component {
  static propTypes = { newQuiz:          React.PropTypes.object.isRequired
                     , hideNewQuiz:      React.PropTypes.func.isRequired
                     , setQuestion:      React.PropTypes.func.isRequired
                     , setAnswer:        React.PropTypes.func.isRequired
                     , setChoice:        React.PropTypes.func.isRequired
                     , setSolution:      React.PropTypes.func.isRequired
                     , addNewChoice:     React.PropTypes.func.isRequired
                     , setIsShortAnswer: React.PropTypes.func.isRequired
                     , removeChoice:     React.PropTypes.func.isRequired
                     , resetNewQuiz:     React.PropTypes.func.isRequired
                     , createQuiz:       React.PropTypes.func.isRequired
                     }

  constructor () {
    super()
    this.state = { isLoading: false
                 , errors:    {}
                 }
    this.onQuestionChange = this.onQuestionChange.bind(this)
    this.onAnswerChange   = this.onAnswerChange.bind(this)
    this.onChoiceEdit     = this.onChoiceEdit.bind(this)
    this.onNewChoice      = this.onNewChoice.bind(this)
    this.onSolutionChange = this.onSolutionChange.bind(this)
    this.onSubmit         = this.onSubmit.bind(this)
    this.onChoiceRemove   = this.onChoiceRemove.bind(this)
    this.onReset          = this.onReset.bind(this)
  }

  onCloseClick     (e)             { this.props.hideNewQuiz() }
  onQuestionChange (e)             { this.props.setQuestion(e.target.value) }
  onAnswerChange   (e)             { this.props.setAnswer(e.target.value) }
  onChoiceEdit     (e, index)      { this.props.setChoice(e.target.value, index) }
  onChoiceRemove   (e, index)      { this.props.removeChoice(index) }
  onNewChoice      ()              { this.props.addNewChoice() }
  onSolutionChange (e)             { this.props.setSolution(Number(e.target.value)) }
  onTypeSelect     (isShortAnswer) { this.props.setIsShortAnswer(isShortAnswer) }

  onReset () {
    this.setState({ errors: {} })
    this.props.resetNewQuiz()
  }

  onSubmit (e) { e.preventDefault() 
    this.setState({ isLoading: true })

    const { isShortAnswer, question, answer, choices, solutionIndex } = this.props.newQuiz

    const payload = { isShortAnswer
                    , question: question.trim()
                    }

    if (isShortAnswer) {
      payload.answer  = answer.trim()
    }
    else {
      payload.choices = choices.filter(choice => choice.trim())
      payload.answer  = solutionIndex >= 0 ? choices[solutionIndex].trim() : ''
    }

    this.props.createQuiz(payload)
      .then(res => {
        console.log(res)
        this.setState({ isLoading: false })
        this.props.hideNewQuiz()
        this.props.resetNewQuiz()
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors, isLoading: false})
      })
  }

  render() {
    const { newQuiz } = this.props
    const { errors } = this.state

    return (
      <div className="NewQuiz">
        {this.props.shouldShowNewQuiz &&
          <div className="NewQuiz-overlay">
            <div
              className="NewQuiz-closeTarget"
              onClick={this.onCloseClick.bind(this)}
            >
            </div>

            <div className="NewQuiz-newQuiz">
              <h2 className="NewQuiz-title">Create a new quiz</h2>

              <QuizTypeSelection
                isShortAnswer={newQuiz.isShortAnswer}
                setIsShortAnswer={this.props.setIsShortAnswer}
              />

              <form className="NewQuiz-form">
                <div className={`NewQuiz-question Field ${errors.question ? "Field--error" : ""}`}>
                  <input
                    type="text"
                    placeholder="question"
                    value={newQuiz.question}
                    onChange={this.onQuestionChange}
                  />

                  <div className="HelpBlock">
                    {this.state.errors.question &&
                      <p>{this.state.errors.question}</p>
                    }
                  </div>
                </div>

                <div className="NewQuiz-answer">
                  {newQuiz.isShortAnswer
                    ? <div className={`NewQuiz-shortAnswer Field ${errors.question ? "Field--error" : ""}`}>
                        <input
                          type="text"
                          placeholder="answer"
                          value={newQuiz.answer}
                          onChange={this.onAnswerChange}
                        />

                        <div className="HelpBlock">
                          {this.state.errors.answer &&
                            <p>{this.state.errors.answer}</p>
                          }
                        </div>
                      </div>

                    : <MultipleChoiceFields
                        choices={newQuiz.choices}
                        solutionIndex={newQuiz.solutionIndex}
                        errors={this.state.errors}
                        handleNewChoice={this.onNewChoice}
                        handleChoiceEdit={this.onChoiceEdit}
                        handleChoiceRemove={this.onChoiceRemove}
                        handleSolutionChange={this.onSolutionChange}
                      />
                    }
                </div>

                <div className="NewQuiz-control Field">
                  <button
                    className="NewQuiz-resetButton Button"
                    type="button"
                    onClick={this.onReset}
                  >
                    Reset
                  </button>

                  <button
                    className="NewQuiz-submitButton Button Button--primary"
                    type="button"
                    onClick={this.onSubmit}
                    disabled={this.state.isLoading}
                  >
                    {this.state.isLoading ?  <Loading /> : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ shouldShowNewQuiz, newQuiz }) => (
  { shouldShowNewQuiz, newQuiz }
)

export default connect( mapStateToProps
                      , { hideNewQuiz
                        , setQuestion
                        , setAnswer
                        , setChoice
                        , addNewChoice
                        , setSolution
                        , setIsShortAnswer
                        , removeChoice
                        , resetNewQuiz
                        , createQuiz
                        }
                      )(NewQuiz)
