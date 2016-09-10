import { SET_QUESTION
       , SET_ANSWER
       , SET_CHOICE
       , ADD_NEW_CHOICE
       , REMOVE_CHOICE
       , SET_SOLUTION
       , SET_IS_SHORT_ANSWER
       , RESET_NEW_QUIZ } from '../constants'

const initialState = { question:      ''
                     , answer:        ''
                     , choices:       ['']
                     , solutionIndex: -1
                     , isShortAnswer: true
                     }

const newQuiz = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTION:
      return { ...state, question: action.question }
    case SET_ANSWER:
      return { ...state, answer: action.answer }
    case ADD_NEW_CHOICE:
      return { ...state, choices: [ ...state.choices, '' ] }
    case REMOVE_CHOICE:
      return { ...state
             , choices: state.choices.filter((_, i) => i !== action.index)
             }
    case SET_CHOICE:
      const newChoices = state.choices.map(
        (choice, i) => (i === action.index) ? action.choice : choice
      )
      return { ...state, choices: newChoices }
    case SET_SOLUTION:
      return { ...state, solutionIndex: action.solutionIndex }
    case SET_IS_SHORT_ANSWER:
      return { ...state, isShortAnswer: action.isShortAnswer }
    case RESET_NEW_QUIZ:
      return initialState
    default:
      return state
  }
}

export default newQuiz
