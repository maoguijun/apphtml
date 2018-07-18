// import FetchHttpClient, {json, form,credentials} from 'fetch-http-client';
import * as qs from 'querystring'
import 'isomorphic-fetch'
import { FetchGetCache } from './cache'
import { formatLang } from './index'

// 判断浏览器
function IEVersion () {
  var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion == 7) {
      return 7
    } else if (fIEVersion == 8) {
      return 8
    } else if (fIEVersion == 9) {
      return 9
    } else if (fIEVersion == 10) {
      return 10
    } else {
      return 6 // IE版本<=7
    }
  } else if (isEdge) {
    return 'edge' // edge
  } else if (isIE11) {
    return 11 // IE11
  } else {
    return -1 // 不是ie浏览器
  }
}

export function checkStatus (response) {
  if (!response.ok) {
    // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText, -1)
    error.response = response
    throw error
  }
  return response
}

export function parseJSON (response) {
  // response.url 是否是err
  if (response.url.indexOf('error/failed') > -1) {
    return {
      msg: '您的登录邮箱或密码输入有误，请重试',
      status: 'failed'
    }
  } else {
    return response.json()
  }
}

export function checkRsponseStatus (response) {
  if (response.status !== 'success') {
    // (response.status < 200 || response.status > 300)
    let error = new Error(response.msg, response.code, response.flag)
    error.code = response.code
    error.message = response.msg
    throw error
  }
  return response
}

// export function getClient(host,language){
//    let client=clients[host+'_'+language];
//    if(typeof client!='undefined'){
//    }
//    else {
//        clients[host+'_'+language]= new FetchHttpClient(host);
//        client=clients[host+'_'+language];
//        client.addMiddleware(request => {
//            request.options.headers['Accept-Language'] = language;
//        });
//        client.addMiddleware(credentials('include'));
//        client.addMiddleware(checkStatus);
//        client.addMiddleware(json());
//        client.addMiddleware(checkRsponseStatus);
//    }
//    return client;
// }

export function easyfetch (host, url, method, args = {}, language = '', addrandversion = false, contenttype = 'json') {
  if (addrandversion) {
    if (url.indexOf('?') < 0) {
      url += '?v=' + new Date().valueOf()
    } else {
      url += '&v=' + new Date().valueOf()
    }
  }
  // 如果是ie浏览器则全部get 添加时间戳
  if (IEVersion() > -1) {
    if (url.indexOf('?') < 0) {
      url += '?v=' + new Date().valueOf()
    } else {
      url += '&v=' + new Date().valueOf()
    }
  }
  let mheaders = {}
  if (contenttype !== 'json') {
    mheaders = {
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Language': language
    }
  } else {
    mheaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept-Language': language
    }
  }

  let result
  const headers = mheaders
  switch (method.toLowerCase()) {
    case 'post':
    case 'put':
    case 'delete':
      result = fetch(`${host}${url}`, {
        mode: 'cors',
        cache: 'default',
        method: method,
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(args)
      })
      break
    case 'get':
      let argstr = ''
      if (args) {
        argstr = qs.stringify(args)
        if (argstr) {
          if (url.indexOf('?') < 0) {
            argstr = '?' + argstr
          } else {
            argstr = '&' + argstr
          }
        }
      }
      result = fetch(`${host}${url}${argstr}`, {
        method: method,
        credentials: 'include',
        headers: headers
      })

      break
  }
  return result
    .then(checkStatus)
    .then(parseJSON)
    .then(checkRsponseStatus)
}

export function easyFetchWithCache (host, url, method, args = {}, language = '', clear = false, contenttype = 'form') {
  // alert('easyFetchWithCache')
  let result = {}
  if (args == null) {
    args = {}
  }
  if (method == 'get') {
    const fetchFunc = () => {
      return easyfetch(host, url, method, args, language, clear, contenttype)
    }
    result = FetchGetCache(host, url, args, language, clear, fetchFunc)
  } else {
    result = easyfetch(host, url, method, args, language, clear, contenttype)
  }
  return result
}
