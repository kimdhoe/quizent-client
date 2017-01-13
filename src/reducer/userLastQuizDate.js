const userLastQuizDate = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_USER_LAST_QUIZ_DATE':
      return action.lastDate

    default:
      return state
  }
}

export default userLastQuizDate
