import React from 'react'

import Loading from './Loading'

const QuizSubmitForm = ({ value, placeholder, isLoading, onChange, onSubmit }) =>
  <form onSubmit={onSubmit} className="QuizSubmitForm">
    <div className="QuizSubmitForm-answer">
      <input
        className="QuizSubmitForm-answerInput"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>

    <div className="QuizSubmitForm-answerSubmit">
      <button
        className={"QuizSubmitForm-button Button Button--primary"}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ?  <Loading /> : "Submit"}
      </button>
    </div>
  </form>

QuizSubmitForm.propTypes =
  { value:       React.PropTypes.string.isRequired
  , placeholder: React.PropTypes.string.isRequired
  , isLoading:   React.PropTypes.bool.isRequired
  , onChange:    React.PropTypes.func.isRequired
  , onSubmit:    React.PropTypes.func.isRequired
  }

export default QuizSubmitForm
