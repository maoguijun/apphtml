export const postMessage = (router = 'back') => {
  if (window.originalPostMessage) {
    window.postMessage(router)
  } else {
    throw Error('postMessage接口还未注入')
  }
}
