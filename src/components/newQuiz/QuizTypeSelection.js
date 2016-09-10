import React from 'react'
import classnames from 'classnames'

const QuizTypeSelection = ({ isShortAnswer, setIsShortAnswer }) =>
  <div className="NewQuiz-quizType">
    <div className="NewQuiz-type">
      <button
        className={classnames("NewQuiz-typeButton", {"is-selected": isShortAnswer})}
        type="button"
        disabled={isShortAnswer}
        onClick={() => setIsShortAnswer(true)}
      >
        short-answer
      </button>
    </div>

    <span className="NewQuiz-separator">|</span>

    <div className="NewQuiz-type">
      <button
        className={classnames("NewQuiz-typeButton", {"is-selected": !isShortAnswer})}
        type="button"
        disabled={!isShortAnswer}
        onClick={() => setIsShortAnswer(false)}
      >
        multiple-choice
      </button>
    </div>
  </div>

export default QuizTypeSelection
