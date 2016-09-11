import React from 'react'

const MultipleChoiceForm = ({ choices, answer, isLoading, handleSubmit }) =>
  <div className="MultipleChoiceForm">
    {choices.map((choice, i) =>
      <div
        key={i}
        className={`MultipleChoiceForm-choice ${choice === answer ? "is-chosen" : ""}`}
      >
        <button
          className="MultipleChoiceForm-button"
          type="button"
          disabled={isLoading}
          onClick={() => handleSubmit(choice)}
        >
          <span className="MultipleChoiceForm-choiceNumber">
            {`${i + 1}) `}
          </span>
          <span className="MultipleChoiceForm-choiceText">
            {choice}
          </span>
        </button>
      </div>
    )}
  </div>

MultipleChoiceForm.propTypes =
  { choices:      React.PropTypes.array.isRequired
  , answer:       React.PropTypes.string.isRequired
  , isLoading:    React.PropTypes.bool.isRequired
  , handleSubmit: React.PropTypes.func.isRequired
  }

export default MultipleChoiceForm
