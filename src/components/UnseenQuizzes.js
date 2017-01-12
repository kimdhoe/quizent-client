import React from 'react'

const UnseenQuizzes = ({ nNewQuizzes, onClick }) =>
  <div className="UnseenQuizzes">
    {nNewQuizzes > 0 &&
      <button className="UnseenQuizzes-button Button Button--primary"
        onClick={onClick}
      >
        Fetch {nNewQuizzes} new {nNewQuizzes === 1 ? 'quiz' : 'quizzes'}.
      </button>
    }
  </div>

UnseenQuizzes.propTypes =
  { nNewQuizzes: React.PropTypes.number.isRequired
  , onClick:     React.PropTypes.func.isRequired
  }

export default UnseenQuizzes
