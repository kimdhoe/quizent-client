import React       from 'react'
import { connect } from 'react-redux'

import NavBar from '../components/NavBar'
import { logout } from '../actions/auth'

const mapStateToProps = ({ isUserLoggedIn, isFetching, username }) => (
  { isUserLoggedIn
  , isFetching
  , username
  }
)

export default connect(mapStateToProps, { logout })(NavBar)
