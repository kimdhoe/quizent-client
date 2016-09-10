import { combineReducers } from 'redux'

import flashMessages     from './flashMessages'
import username          from './username'
import isUserLoggedIn    from './isUserLoggedIn'
import isFetching        from './isFetching'
import userList          from './userList'
import me                from './me'
import myQuizzes         from './myQuizzes'
import user              from './user'
import userQuizzes       from './userQuizzes'
import shouldShowNewQuiz from './shouldShowNewQuiz'
import newQuiz           from './newQuiz'

const reducer = combineReducers({ flashMessages
                                , username
                                , isUserLoggedIn
                                , isFetching
                                , userList
                                , me
                                , myQuizzes
                                , user
                                , userQuizzes
                                , shouldShowNewQuiz
                                , newQuiz
                                }
                               )

export default reducer
