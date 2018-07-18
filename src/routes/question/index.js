import { injectReducer } from 'store/reducers'
import { rootPath, secondRouter } from '../../config'

export default store => ({
  path: rootPath.question,
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const question = require('./container/question').default
        const reducer = require('./modules/question').default
        injectReducer(store, { key: 'question', reducer })
        cb(null, question)
      },
      'question'
    )
  }
})
