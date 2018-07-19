import { injectReducer } from 'store/reducers'
import { rootPath, secondRouter } from '../../config'

export default store => ({
  path: rootPath.result,
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const result = require('./container/result').default
        const reducer = require('./modules/result').default
        injectReducer(store, { key: 'result', reducer })
        cb(null, result)
      },
      'result'
    )
  }
})
