import Immutable from 'immutable'
import { easyfetch } from '../../../utils/FetchHelper'
import { host } from '../../../config'

export const FETCH_QUESTION = 'FETCH_QUESTION'
export const NEW_RESULT = 'NEW_RESULT'

export const fetchQuestion = (json, language) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/s/choiceQuestions', 'get', json, language)
      .then(e => {
        return dispatch({
          type: FETCH_QUESTION,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const newResult = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/s/stuInterestFields', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_RESULT,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

const ACTION_HANDLERS = {
  [FETCH_QUESTION]: (state, action) =>
    state
      .update('quiz', () => Immutable.fromJS(action.payload.objs))
      .update('count', () => Immutable.fromJS(action.payload.count))
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function quizReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
