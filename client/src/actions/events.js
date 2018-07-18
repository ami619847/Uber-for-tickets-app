import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const FETCHED_ALL_EVENTS = 'FETCHED_ALL_EVENTS'
export const FETCHED_DETAILED_EVENT = 'FETCHED_DETAILED_EVENT'
export const ADD_EVENT = 'ADD_EVENT'

export const fetchAllEvents = () => (dispatch) => {
    request
     .get(`${baseUrl}/events`)
     .then(response => dispatch({
       type: FETCHED_ALL_EVENTS,
       payload: response.body.events
     }))
     .catch(err => alert(err))
}

export const fetchEvent = (eventId) => (dispatch) => {
  request
    .get(`${baseUrl}/events/${eventId}`)
    .then(response => dispatch({
      type: FETCHED_DETAILED_EVENT,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const createEvent = (event) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(event)
    .then(response => dispatch({
      type: ADD_EVENT,
      payload: response.body
    }))
}