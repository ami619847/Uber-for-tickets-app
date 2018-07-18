import {FETCHED_ALL_EVENTS, ADD_EVENT} from '../actions/events'
import {USER_LOGOUT} from '../actions/users'

export default function (state = [], action) {
  switch (action.type) {
    case USER_LOGOUT:
      return null

    case FETCHED_ALL_EVENTS:
      return action.payload

    case ADD_EVENT:
  	  return [...state, action.payload]

  	default:
      return state
  }
}