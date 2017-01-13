const myLastQuizDate = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_MY_LAST_QUIZ_DATE':
      return action.lastDate

    default:
      return state
  }
}

export default myLastQuizDate
