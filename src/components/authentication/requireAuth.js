import React from 'react'
import { connect } from 'react-redux'
import { rootPath } from '../../config'
import { pathJump } from '../../utils'
import { getUserInfo } from '../../store/user'
// import { USER_LOGGED_IN } from '../../routes/Login/modules/login'
// import { fetchUserInfo } from '../../routes/Login/modules/login'
// import { Modal, Button, message } from 'antd'

// 判断用户是否登录的组件

export function requireAuth (Component) {
  class AuthenticatedComponent extends React.PureComponent {
    componentWillMount () {
      const { dispatch, location } = this.props
      this.check(this.props)
    }

    componentWillReceiveProps (props) {
      if (props.location !== this.props.location) {
        this.check(props)
      }
    }

    logoutWarning = () => {
      const { dispatch } = this.props
      Modal.warning({
        title: '错误信息',
        content: '您当前的会话已超时，请重新登录',
        onOk () {
          dispatch(pathJump(rootPath.login))
        }
      })
    }

    check = props => {
      const { location } = this.props
      if (!props.logout) {
        props
          .dispatch(fetchUserInfo())
          .then(e => {
            console.log(222222)
            console.log('-----', props.location.pathname, rootPath.login)
            if (e.payload) {
              let loginInfo = {}
              loginInfo = window.sessionStorage ? JSON.parse(window.sessionStorage.getItem('loginInfo')) || {} : {}
              if (loginInfo.mail && e.payload.mail !== loginInfo.mail) {
                this.logoutWarning()
              }
              console.log('=====已登录=====')
            } else {
              if (e.payload.code === 10 || e.payload.code === 401) {
                if (props.location.pathname !== rootPath.login) {
                  this.logoutWarning()
                }
              }
            }
          })
          .catch(e => this.logoutWarning())
      }
    }
    render () {
      return <Component {...this.props} />
    }
  }
  const mapStateToProps = state => {
    console.log(90, state && state.toJS())
    return {
      logout: state.getIn(['userInfo', 'userLogout']),
      userInfo: state.getIn(['userInfo', 'userLoginInfo'])
    }
  }

  return connect(mapStateToProps)(AuthenticatedComponent)
}
