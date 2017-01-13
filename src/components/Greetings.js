import React    from 'react'
import { Link } from 'react-router'

import LoginFormContainer  from '../containers/LoginFormContainer'
import SignupFormContainer from '../containers/SignupFormContainer'

const Greetings = () =>
  <div className="Greetings Grid">
    <div className="Welcome Grid-cell size-tall-6of12">
      <h2>Welcome to Quizent!</h2>

      <h3>
        Quizent is a Twitter-like quiz SNS.
      </h3>

      <p>
        You can post your own quizzes or follow people who present interesting
        quizzes!
      </p>

      <Link to="/user/kimdhoe">Try Demo</Link>
    </div>

    <div className="Join Grid-cell prefix-tall-1 size-tall-5of12">
      <LoginFormContainer />
      <SignupFormContainer />
    </div>
  </div>

export default Greetings
