import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import LocaleContainer from './LocaleContainer'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import { secondRouter } from '../config'
// import { Modal, Button, message } from 'antd'
import { pathJump } from '../utils/'
import '../styles/core.scss'
import '../styles/alifont/iconfont.css'
import moment from 'moment'
// import { fetchUserInfo } from '../routes/Login/modules/login'
moment.locale('zh')

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { dispatch, routes } = this.props
    console.log('tttttt', this.props, window.location.pathname)

    // if (window.location.pathname !== `${secondRouter}/login` && routes.path !== `${secondRouter}/`) {
    //   dispatch(fetchUserInfo()).then(e => {
    //     if (e.payload) {
    //     } else {
    //       message.error(e.error.message)
    //       // dispatch(pathJump('/login'))
    //     }
    //   })
    // }
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props
    const history = syncHistoryWithStore(browserHistory, store, {
      selectLocationState (state) {
        return state.get('routing')
      }
    })

    addLocaleData([...en, ...zh])
    return (
      <Provider store={store}>
        <LocaleContainer>
          <div style={{ height: '100%' }}>
            <Router history={history} children={routes} />
          </div>
        </LocaleContainer>
      </Provider>
    )
  }
}

export default connect()(AppContainer)
