import React    from 'react'
import { Link } from 'react-router'

import Loader from './Loader'

const NavBar = ({ isUserLoggedIn, isFetching, username, logout }) => {
  const onClick = e => {
    e.preventDefault()
    logout()
  }

  const userLinks =
    <ul className="NavBar-itemList">
      <li className="NavBar-item">
        <Link className="NavBar-link" to="/users">Users</Link>
      </li>
      <li className="NavBar-item">
        <Link className="NavBar-link" to="/me"><strong>{username}</strong></Link>
      </li>
      <li className="NavBar-item">
        <a className="NavBar-link" href="#" onClick={onClick}>Logout</a>
      </li>
    </ul>

  const guestLinks =
    <ul className="NavBar-itemList">
      <li className="NavBar-item">
        <Link className="NavBar-link" to="/protected">Protected</Link>
      </li>
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
          <Link to="/" className="NavBar-brandLink">Quizent</Link>
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
  }

export default NavBar
