import React from 'react'

const ShortAnswerForm = ({ value, placeholder, isLoading, onChange, onSubmit }) =>
  <form onSubmit={onSubmit} className="ShortAnswerForm">
    <div className="ShortAnswerForm-answer">
      <input
        className="ShortAnswerForm-answerInput"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>

    <div className="ShortAnswerForm-answerSubmit">
      <button
        className={"ShortAnswerForm-button Button Button--primary"}
        type="submit"
        disabled={isLoading}
      >
        Submit
      </button>
    </div>
  </form>

ShortAnswerForm.propTypes =
  { value:       React.PropTypes.string.isRequired
  , placeholder: React.PropTypes.string.isRequired
  , isLoading:   React.PropTypes.bool.isRequired
  , onChange:    React.PropTypes.func.isRequired
  , onSubmit:    React.PropTypes.func.isRequired
  }

export default ShortAnswerForm
