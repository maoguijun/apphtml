import { injectReducer } from 'store/reducers'
import { rootPath, secondRouter } from '../../config'

export default store => ({
  path: rootPath.field,
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const field = require('./container/field').default
        const reducer = require('./modules/field').default
        injectReducer(store, { key: 'field', reducer })
        cb(null, field)
      },
      'field'
    )
  }
})
