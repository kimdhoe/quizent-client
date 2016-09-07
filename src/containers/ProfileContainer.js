import { connect } from 'react-redux'

import Profile       from '../components/Profile'
import { fetchUser } from '../actions/user'

const mapStateToProps = ({ shownUser, quizzes }) => (
  { shownUser, quizzes }
)

const mapDispatchToProps = dispatch => (
  { fetchUser: username => dispatch(fetchUser(username)) }
)

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer
