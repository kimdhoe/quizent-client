import React from 'react'

const User = ({ username, fullname }) =>
  <div className="User">
    <header className="User-names">
      <span className="User-fullname">{fullname}</span>
      <span className="User-username"> @{username}</span>
    </header>
  </div>

export default User
