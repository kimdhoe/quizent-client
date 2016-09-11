import React from 'react'

const GradeBox = ({ isDirty, isCorrect }) =>
  <div className="GradeBox">
    {isDirty &&
      (isCorrect
        ? <p className="GradeBox-text is-correct">Good job!</p>
        : <p className="GradeBox-text is-wrong">Try again.</p>
        )
    }
  </div>

export default GradeBox
