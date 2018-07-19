import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const FETCHED_ALL_TICKETS = 'FETCHED_ALL_TICKETS'
export const FETCHED_DETAILED_TICKET = 'FETCHED_DETAILED_TICKET'
export const ADD_TICKET = 'ADD_TICKET'
export const UPDATE_TICKET = 'UPDATE_TICKET'

export const fetchAllTickets = () => (dispatch) => {
    request
     .get(`${baseUrl}/tickets`)
     .then(response => dispatch({
       type: FETCHED_ALL_TICKETS,
       payload: response.body.tickets
     }))
     .catch(err => alert(err))
}

export const fetchTicket = (ticketId) => (dispatch) => {
  request
    .get(`${baseUrl}/tickets/${ticketId}`)
    .then(response => dispatch({
      type: FETCHED_DETAILED_TICKET,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const createTicket = (ticket) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(ticket)
    .then(response => dispatch({
      type: ADD_TICKET,
      payload: response.body
    }))
}

export const updateTicket = (ticketId, updates) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .put(`${baseUrl}/tickets/${ticketId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(updates)
      .then(response => dispatch({
        type: UPDATE_TICKET,
        payload: response.body
      }))
  }