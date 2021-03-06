import React from 'react'

import Choice from './Choice'

const MultipleChoiceFields = ({ choices
                              , solutionIndex
                              , errors
                              , handleNewChoice
                              , handleChoiceEdit
                              , handleSolutionChange
                              , handleChoiceRemove }) =>
  <div className="NewQuiz-multipleChoice">
    <div className="Field">
      <button className="Button Button--primary" type="button" onClick={handleNewChoice}>
        Add New Choice
      </button>
    </div>

    <div className="NewQuiz-choices">
      {choices.map((choice, i) =>
        <Choice
          key={i}
          index={i}
          choice={choice}
          solutionIndex={solutionIndex}
          handleSolutionChange={handleSolutionChange}
          handleChoiceEdit={handleChoiceEdit}
          handleChoiceRemove={handleChoiceRemove}
        />
      )}
    </div>

    <div className="HelpBlock">
      {errors.choices  && <p className="HelpBlock-text">{errors.choices}</p>}
      {errors.solution && <p className="HelpBlock-text">{errors.solution}</p>}
    </div>
  </div>

export default MultipleChoiceFields
