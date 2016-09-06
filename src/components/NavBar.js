import React    from 'react'
import { Link } from 'react-router'

const NavBar = ({ isUserLoggedIn, isFetching, username, logout }) => {
  const onClick = e => {
    e.preventDefault()
    logout()
  }

  const userLinks =
    <ul className="NavBar-items Grid--right">
      <li className="NavBar-item Grid-cell size-tall-2of12">
        <Link className="NavBar-link" to="/users">Users</Link>
      </li>
      <li className="NavBar-item Grid-cell size-tall-2of12">
        <Link className="NavBar-link" to="/me"><strong>{username}</strong></Link>
      </li>
      <li className="NavBar-item Grid-cell size-tall-2of12">
        <a className="NavBar-link" href="#" onClick={onClick}>Logout</a>
      </li>
    </ul>

  const guestLinks =
    <ul className="NavBar-items Grid-cell">
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
    <header>
      <nav className="NavBar Grid">
        <div className="Grid-cell size-tall-4of12">
          <h1 className="NavBar-brand">
            <Link to="/" className="NavBar-brand">Quizent</Link>
          </h1>
          {isFetching &&
            <span className="NavBar-loader">loading...</span>
          }
        </div>

        <div className="Grid-cell size-tall-8of12">
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
