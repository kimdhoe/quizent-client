import React    from 'react'
import { Link } from 'react-router'

import FollowButton from './FollowButton'

const UserBox = ({ isUserLoggedIn, isMe, user, buttonText, toggleFollow }) =>
  <div className="UserBox">
    <header>
      <Link className="UserBox-names" to={`/user/${user.username}`}>
        <strong className="UserBox-fullname">{user.fullname}</strong>
        <span className="UserBox-username"> @{user.username}</span>
      </Link>
    </header>

    <div className="UserBox-body">
      {isUserLoggedIn && !isMe &&
        <div className="UserBox-follow">
          <FollowButton
            buttonText={buttonText}
            handleClick={toggleFollow}
          />
        </div>
      }
    </div>
  </div>

UserBox.propTypes =
  { isMe:         React.PropTypes.bool.isRequired
  , user:         React.PropTypes.object.isRequired
  , buttonText:   React.PropTypes.string.isRequired
  , toggleFollow: React.PropTypes.func.isRequired
  }

export default UserBox
