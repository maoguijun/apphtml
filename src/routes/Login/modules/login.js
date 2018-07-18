import Immutable from 'immutable'
import {easyFetchWithCache,easyfetch} from '../../../utils/FetchHelper'
import {host} from '../../../config'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const FETCH_USER_INFO = 'FETCH_USER_INFO'
export const FETCH_CAPTCHA = 'FETCH_CAPTCHA'
export const CHECK_CODE = 'CHECK_CODE'
export const CHECK_MAIL_CODE = 'CHECK_MAIL_CODE'
export const SEND_MAIL_AGAIN = 'SEND_MAIL_AGAIN'
export const FORGET_PWD = 'FORGET_PWD'

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------


export const login = (params) => {
  return (dispatch, getState) => {
    console.log('123')
    return easyfetch(host,'/login','post',params,null,true,'json')

      .then(e => {
        //将用户信息存到本地
        console.log('123')
        window.sessionStorage.loginInfo = JSON.stringify(e.obj)
        return(dispatch({
          type:USER_LOGGED_IN,
          payload:e
        }))
      }
      )
      .catch(error =>({error:error}))
  }
}


export const fetchUserInfo = () => {
  return (dispatch, getState) => {
    return easyfetch(host,'/userinfo','get')
      .then(e => {
        console.log('ggggggg',e)
          return(dispatch({
            type:FETCH_USER_INFO,
            payload:e.obj
          }))
        }
      )
      .catch(error =>({error:error}))
  }
}

export const checkCode= (json) => {
  return (dispatch, getState) => {
    return easyfetch(host,'/checkCaptcha','post',json)
      .then(e => {
          return(dispatch({
            type:CHECK_CODE,
            payload:e
          }))
        }
      )
      .catch(error =>({error:error}))
  }
}

export const checkMailCode= (json) => {
  return (dispatch, getState) => {
    return easyfetch(host,'/commons/checkVerificationCode','post',json)
      .then(e => {
          return(dispatch({
            type:CHECK_MAIL_CODE,
            payload:e
          }))
        }
      )
      .catch(error =>({error:error}))
  }
}

export const SendCodeAgain = (json) => {
  return (dispatch, getState) => {
    return easyfetch(host,'/commons/sendEmailVerificationCode','post',json)
      .then(e => {
          return(dispatch({
            type:SEND_MAIL_AGAIN,
            payload:e
          }))
        }
      )
      .catch(error =>({error:error}))
  }
}

export const forgetPwd = (json) => {
  return (dispatch, getState) => {
    return easyfetch(host,'/account/forgetPassword','put',json)
      .then(e => {
          return(dispatch({
            type:FORGET_PWD,
            payload:e
          }))
        }
      )
      .catch(error =>({error:error}))
  }
}

const ACTION_HANDLERS = {
  [USER_LOGGED_IN]    : (state, action) => state.update('userInfo',() =>Immutable.fromJS(action.payload.obj)).update('userLogout',()=>false),
  [FETCH_USER_INFO]    : (state, action) => state.update('userLoginInfo',() =>Immutable.fromJS(action.payload)),

};


// ------------------------------------
// Reducer
// ------------------------------------
export default function userInfoReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
