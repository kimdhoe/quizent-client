import { combineReducers } from 'redux'

import flashMessages  from './flashMessages'
import username       from './username'
import quizzes        from './quizzes'
import isUserLoggedIn from './isUserLoggedIn'
import isFetching     from './isFetching'
import userList       from './userList'
import shownUser      from './shownUser'
import me             from './me'
import myQuizzes      from './myQuizzes'

const reducer = combineReducers({ flashMessages
                                , username
                                , quizzes
                                , isUserLoggedIn
                                , isFetching
                                , userList
                                , shownUser
                                , me
                                , myQuizzes
                                }
                               )

export default reducer
