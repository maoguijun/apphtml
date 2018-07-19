// We only need to import the modules necessary for initial render
import { rootPath, chilPath, secondRouter } from '../config'
import { requireAuth } from '../components/authentication/requireAuth'
import Field from './field'
import Question from './question'
import Result from './result'

export const createRoutes = store => ({
  path: rootPath.base,
  exact: true,
  indexRoute: {
    onEnter: (nextState, replaceState) => {
      replaceState(rootPath.field) // 应该跳转到默认的首页
    }
  },

  childRoutes: [
    {
      // component: requireAuth(Layout),
      childRoutes: [Field(store), Question(store), Result(store)]
    }
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
