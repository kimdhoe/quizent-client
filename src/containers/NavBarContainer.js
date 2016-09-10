import React       from 'react'
import { connect } from 'react-redux'

import NavBar          from '../components/NavBar'
import { logout }      from '../actions/auth'
import { showNewQuiz } from '../actions/newQuiz'

const mapStateToProps = ({ isUserLoggedIn, isFetching, username }) => (
  { isUserLoggedIn
  , isFetching
  , username
  }
)

export default connect(mapStateToProps, { logout, showNewQuiz })(NavBar)
