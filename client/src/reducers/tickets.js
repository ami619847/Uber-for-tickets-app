import {FETCHED_ALL_TICKETS, ADD_TICKET, UPDATE_TICKET} from '../actions/tickets'
import {USER_LOGOUT} from '../actions/users'

export default function (state = [], action) {
  switch (action.type) {
    case USER_LOGOUT:
      return null

    case FETCHED_ALL_TICKETS:
      return action.payload

    case ADD_TICKET:
      return [...state, action.payload]
      
    case UPDATE_TICKET:
      return state.map(ticket => {
        if (ticket.id === action.payload.id) {
          return action.payload
        }
        else return ticket
      })

  	default:
      return state
  }
}