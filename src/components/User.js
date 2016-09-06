import React from 'react'


const User = ({ isFetching, user, isMe, buttonText, toggleFollow }) =>
  <div className="User">
    <header className="User-names">
      <strong className="User-fullname">{user.fullname}</strong>
      <span className="User-username"> @{user.username}</span>
    </header>

    <div className="User-body">
      {!isMe &&
        <div className="User-follow">
          <button
            className="User-followButton Button Button--primary"
            onClick={id => toggleFollow(user._id)}
            disabled={isFetching}
          >
            {buttonText}
          </button>
        </div>
      }
    </div>
  </div>

User.propTypes =
  { user: React.PropTypes.object.isRequired
  }

export default User
