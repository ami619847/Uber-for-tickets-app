import {FETCHED_DETAILED_EVENT} from '../actions/events'

export default function (state = null, action) {
  switch (action.type) {
    case FETCHED_DETAILED_EVENT:
      return action.payload

    default:
      return state
  }
}