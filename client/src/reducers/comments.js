import {FETCHED_ALL_COMMENTS, ADD_COMMENT} from '../actions/comments'
import {USER_LOGOUT} from '../actions/users'

export default function (state = [], action) {
  switch (action.type) {
    case USER_LOGOUT:
      return null

    case FETCHED_ALL_COMMENTS:
      return action.payload

    case ADD_COMMENT:
  	  return [...state, action.payload]

  	default:
      return state
  }
}