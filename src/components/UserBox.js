import React from 'react'

import FollowButton from './FollowButton'

const UserBox = ({ isFetching, isMe, user, buttonText, toggleFollow }) =>
  <div className="UserBox">
    <header className="UserBox-names">
      <strong className="UserBox-fullname">{user.fullname}</strong>
      <span className="UserBox-username"> @{user.username}</span>
    </header>

    <div className="UserBox-body">
      {!isMe &&
        <div className="UserBox-follow">
          <FollowButton
            buttonText={buttonText}
            onClick={toggleFollow}
            isFetching={isFetching}
          />
        </div>
      }
    </div>
  </div>

UserBox.propTypes =
  { isFetching:   React.PropTypes.bool.isRequired
  , isMe:         React.PropTypes.bool.isRequired
  , user:         React.PropTypes.object.isRequired
  , buttonText:   React.PropTypes.string.isRequired
  , toggleFollow: React.PropTypes.func.isRequired
  }

export default UserBox
