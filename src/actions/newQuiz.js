import { SHOW_NEW_QUIZ
       , HIDE_NEW_QUIZ
       , SET_QUESTION
       , SET_ANSWER
       , SET_CHOICE
       , ADD_NEW_CHOICE
       , REMOVE_CHOICE
       , SET_SOLUTION
       , SET_IS_SHORT_ANSWER
       , RESET_NEW_QUIZ } from '../constants'

export const showNewQuiz = () => (
  { type: SHOW_NEW_QUIZ }
)

export const hideNewQuiz = () => (
  { type: HIDE_NEW_QUIZ }
)

export const setQuestion = question => (
  { type: SET_QUESTION
  , question
  }
)

export const setAnswer = answer => (
  { type: SET_ANSWER
  , answer
  }
)

export const setChoice = (choice, index) => (
  { type: SET_CHOICE
  , choice
  , index
  }
)

export const addNewChoice = () => (
  { type: ADD_NEW_CHOICE }
)

export const removeChoice = index => (
  { type: REMOVE_CHOICE
  , index
  }
)

export const setSolution = solutionIndex => (
  { type: SET_SOLUTION
  , solutionIndex
  }
)

export const setIsShortAnswer = isShortAnswer => (
  { type: SET_IS_SHORT_ANSWER
  , isShortAnswer
  }
)

export const resetNewQuiz = () => (
  { type: RESET_NEW_QUIZ }
)
