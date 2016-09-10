import React from 'react'

const Choice = ({ choice
                , index
                , solutionIndex
                , handleSolutionChange
                , handleChoiceEdit
                , handleChoiceRemove }) => {
  const isRightAnswer = solutionIndex === index

  return (
    <div
      key={index}
      className={`NewQuiz-choice ${isRightAnswer ? "is-rightAnswer" : ""}`}
    >
      <input
        type="radio"
        className="NewQuiz-choiceRadio u-visuallyHidden"
        id={`choice${index}`}
        name="solution"
        value={index}
        onChange={handleSolutionChange}
        checked={isRightAnswer}
      />

    <div className="NewQuiz-radioLabel">
      <label htmlFor={`choice${index}`}>
        {isRightAnswer ? "[\u2713]" : "[ ]"}
      </label>
    </div>

    <div className="NewQuiz-choiceInput">
      <input
        type="text"
        name="choice"
        value={choice}
        placeholder={`choice ${index + 1}`}
        onChange={e => handleChoiceEdit(e, index)}
      />
    </div>

    <div className="NewQuiz-choiceRemove">
      <button
        className="Button"
        type="button"
        onClick={e => handleChoiceRemove(e, index)}
      >
        &times;
      </button>
    </div>
  </div>
  )
}

export default Choice
