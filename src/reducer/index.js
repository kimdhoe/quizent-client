import { combineReducers } from 'redux'

import flashMessages  from './flashMessages'
import username       from './username'
import quizzes        from './quizzes'
import isUserLoggedIn from './isUserLoggedIn'
import isFetching     from './isFetching'
import users          from './users'
import shownUser      from './shownUser'

const reducer = combineReducers({ flashMessages
                                , username
                                , quizzes
                                , isUserLoggedIn
                                , isFetching
                                , users
                                , shownUser
                                }
                               )

export default reducer
