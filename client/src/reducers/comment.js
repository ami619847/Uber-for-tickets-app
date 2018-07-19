import {FETCHED_DETAILED_COMMENT} from '../actions/comments'

export default function (state = null, action) {
  switch (action.type) {
    case FETCHED_DETAILED_COMMENT:
      return action.payload

    default:
      return state
  }
}