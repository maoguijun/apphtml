import Immutable from 'immutable'
import { easyfetch } from '../../../utils/FetchHelper'
import { host } from '../../../config'

export const FETCH_FIELD = 'FETCH_FIELD'
export const NEW_FIELD = 'NEW_FIELD'
export const OPERATION_TEACHER = 'OPERATION_TEACHER'
export const ALT_TEACHER = 'ALT_TEACHER'
export const FETCH_TEACHER_INFO = 'FETCH_TEACHER_INFO'

export const fetchField = (json, language) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/s/interestFields', 'get', json, language)
      .then(e => {
        return dispatch({
          type: FETCH_FIELD,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

// export const fetchQuziInfo = id => {
//   return (dispatch, getState) => {
//     return easyfetch(host, '/s/interestFields' + id, 'get')
//       .then(e => {
//         return dispatch({
//           type: FETCH_TEACHER_INFO,
//           payload: e.obj
//         })
//       })
//       .catch(e => ({ error: e }))
//   }
// }

// export const newField = json => {
//   return (dispatch, getState) => {
//     return easyfetch(host, '/a/quizs', 'post', json)
//       .then(e => {
//         return dispatch(fetchField())
//       })
//       .catch(e => ({ error: e }))
//   }
// }

// export const updateField = (action, id, json) => {
//   return (dispatch, getState) => {
//     return easyfetch(host, '/a/quizs/' + action + '/' + id, 'put', json)
//       .then(e => {
//         return dispatch(fetchField())
//       })
//       .catch(e => ({ error: e }))
//   }
// }
// export const operateField = json => {
//   return (dispatch, getState) => {
//     return easyfetch(host, '/a/account/batchUpdate/', 'post', json)
//       .then(e => {
//         return dispatch(fetchField())
//       })
//       .catch(e => ({ error: e }))
//   }
// }

const ACTION_HANDLERS = {
  [FETCH_FIELD]: (state, action) =>
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
