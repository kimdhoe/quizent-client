import React from 'react'

import '../style/index.scss'

const User = ({ username, fullname }) =>
  <div className="User">
    <header className="User-names">
      <strong className="User-fullname">{fullname}</strong>
      <span className="User-username"> @{username}</span>
    </header>
    <div className="User-body">
      follow buttons
    </div>
  </div>

export default User
