import React from 'react'

const FollowButton = ({ isFetching, buttonText, onClick }) =>
  <button
    className="FollowButton Button Button--primary"
    onClick={onClick}
    disabled={isFetching}
  >
    {buttonText}
  </button>

FollowButton.propTypes =
  { isFetching:   React.PropTypes.bool.isRequired
  , buttonText:   React.PropTypes.string.isRequired
  , onClick:      React.PropTypes.func.isRequired
  }

export default FollowButton
