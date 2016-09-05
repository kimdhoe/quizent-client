import { connect } from 'react-redux'
import { fetchQuizzes } from '../actions'

const mapStateToProps = ({ quizzes }) => (
  { quizzes }
)

export default connect( mapStateToProps
                      , { fetchQuizzes }
                      )(QuizList)
