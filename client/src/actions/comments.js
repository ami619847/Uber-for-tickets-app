import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const FETCHED_ALL_COMMENTS = 'FETCHED_ALL_COMMENTS'
export const FETCHED_DETAILED_COMMENT = 'FETCHED_DETAILED_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'

export const fetchAllComments = () => (dispatch) => {
    request
     .get(`${baseUrl}/comments`)
     .then(response => dispatch({
       type: FETCHED_ALL_COMMENTS,
       payload: response.body.comments
     }))
     .catch(err => alert(err))
}

export const fetchComment = (commentId) => (dispatch) => {
  request
    .get(`${baseUrl}/comments/${commentId}`)
    .then(response => dispatch({
      type: FETCHED_DETAILED_COMMENT,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const createComment = (comment) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/comments`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(comment)
    .then(response => dispatch({
      type: ADD_COMMENT,
      payload: response.body
    }))
}