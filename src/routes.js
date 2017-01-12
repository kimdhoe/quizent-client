import React          from 'react'
import { Route
       , IndexRoute } from 'react-router'

import App               from './components/App'
import Home              from './components/Home'
import SignupPage        from './components/SignupPage'
import LoginPage         from './components/LoginPage'
import Me                from './components/Me'
import Profile           from './components/Profile'
import UserListContainer from './containers/UserListContainer'
import requireAuth       from './utils/requireAuth'
import requireGuest      from './utils/requireGuest'

const routes =
  <Route path="/" component={App}>
    <IndexRoute              component={Home} />
    <Route path="signup"     component={requireGuest(SignupPage)} />
    <Route path="login"      component={requireGuest(LoginPage)} />

    <Route path="users"         component={UserListContainer} />

    <Route path="user/:username" component={Profile} />
    <Route path="me" component={Me}/>
  </Route>

export default routes
