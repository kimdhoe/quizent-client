import React       from 'react'
import { connect } from 'react-redux'

import Navigation from '../components/Navigation'
import { logout } from '../actions/auth'

const mapStateToProps = ({ isUserLoggedIn, isFetching, username }) => (
  { isUserLoggedIn, isFetching, username }
)

export default connect(mapStateToProps, { logout })(Navigation)
