import { connect } from 'react-redux'

import QuizInput from '../components/QuizInput'
import { createQuiz } from '../actions/quiz'

const mapStateToProps = ({ isFetching }) => (
  { isFetching }
)

export default connect(mapStateToProps, { createQuiz })(QuizInput)
