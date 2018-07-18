import { injectReducer } from 'store/reducers'
import {rootPath} from '../../config'

export default (store) => ({
  path : rootPath.login,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Login = require('./containers/LoginContainer').default

      /*  Return getComponent   */
      cb(null, Login)

    /* Webpack named bundle   */
    }, 'login')
  }
})
