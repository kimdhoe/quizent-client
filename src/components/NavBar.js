import React    from 'react'
import { Link } from 'react-router'

import Loader from './Loader'

// !!!
// change to class component
const NavBar = ({ isUserLoggedIn, isFetching, username, logout, showNewQuiz }) => {
  const onClick = e => {
    e.preventDefault()
    logout()
  }

  const onNewQuizClick = e => {
    e.preventDefault()
    showNewQuiz()
  }

  const userLinks =
    <ul className="NavBar-itemList">
      <li className="NavBar-item">
        <a href="#" onClick={onNewQuizClick} className="NavBar-link">
          <span>[New Quiz]</span>
        </a>
      </li>
      <li className="NavBar-item">
        <Link className="NavBar-link" to="/users">
          <span>Users</span>
        </Link>
      </li>
      <li className="NavBar-item">
        <Link className="NavBar-link" to="/me">
          <strong>{username}</strong>
        </Link>
      </li>
      <li className="NavBar-item">
        <a className="NavBar-link" href="#" onClick={onClick}>
          <span>Logout</span>
        </a>
      </li>
    </ul>

  const guestLinks =
    <ul className="NavBar-itemList">
      <li className="NavBar-item">
        <Link className="NavBar-link" to="/signup">Sign up</Link>
      </li>
      <li className="NavBar-item">
        <Link className="NavBar-link" to="/login">Login</Link>
      </li>
    </ul>

  return (
    <header className="NavBar">
      <nav className="container">
        <h1 className="NavBar-brand">
          <Link to="/" className="NavBar-brandLink"><span>quizent</span></Link>
        </h1>

        <div className="NavBar-loader">
          {isFetching &&
            <Loader />
          }
        </div>

        <div className="NavBar-links">
          {isUserLoggedIn ? userLinks : guestLinks}
        </div>
      </nav>
    </header>
  )
}

NavBar.propTypes =
  { isUserLoggedIn: React.PropTypes.bool.isRequired
  , isFetching:     React.PropTypes.bool.isRequired
  , username:       React.PropTypes.string
  , logout:         React.PropTypes.func.isRequired
  , showNewQuiz:    React.PropTypes.func.isRequired
  }

export default NavBar
