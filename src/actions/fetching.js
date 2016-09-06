import { FETCHING
       , DONE_FETCHING } from '../constants'

export const fetching = () => (
  { type: FETCHING }
)

export const doneFetching = () => (
  { type: DONE_FETCHING }
)
