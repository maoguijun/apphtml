import React from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import { Menu, Icon, message, Badge } from 'antd'
import { pathJump } from '../../utils/'
import { logout, getLogNum } from '../../store/user'
import Immutable from 'immutable'
import { rootPath } from '../../config'
import './Nav.scss'
const SubMenu = Menu.SubMenu

class Side extends React.Component {
  // rootSubmenuKeys = ['group_management', 'JR_management', 'PE_management','vendorPo_management','system_settings','personal_center'];
  // state = {
  //   openKeys: [],
  // };

  componentDidMount () {}
  componentWillUnmount () {}

  // onOpenChange = (openKeys) => {
  //   const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
  //   if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //     this.setState({ openKeys });
  //   } else {
  //     this.setState({
  //       openKeys: latestOpenKey ? [latestOpenKey] : [],
  //     });
  //   }
  // }

  render () {
    const props = this.props
    const { intl: { formatMessage }, location: { pathname }, user, userInfo, collapsed } = props
    console.log('user', user, userInfo, props)
    const nav = [
      {
        key: rootPath.quiz,
        name: formatMessage({ id: 'quiz' }),
        icon: 'file',
        show: true
      },
      {
        key: rootPath.homework,
        name: formatMessage({ id: 'homework' }),
        icon: 'book',
        show: true
      },
      {
        key: rootPath.personCenter,
        name: formatMessage({ id: 'personCenter' }),
        icon: 'copy',
        show: true
      },

    ]

    const getSubKey = pathname => {
      // //console.log('pathname',pathname)
      let key = pathname.replace(/(^\/)+|\/.*/g, '')
      let sub = [],
        subkey
      nav.forEach(item => {
        if (item.show && item.type === 'sub') {
          sub.push(item)
        }
      })
      sub.forEach(item => {
        let iskey = false
        item.child.forEach(child => {
          if (child.key === key) {
            iskey = true
          }
        })
        iskey && (subkey = item.key)
      })
      return subkey
    }

    // let _user = userInfo&&userInfo.toJS()
    // let checkNavDisplay=navList=>{
    //  return navList.map(nav=>{
    //
    //    let hasScope=false;
    //    let _userRole = [];
    //    if(_user&&_user.roles){
    //      _user.roles.map(v=>{
    //        _userRole.push(v.id)
    //      })
    //    }
    //    //console.log(_userRole)
    //    //查看权限
    //    if(nav.role && Array.isArray(nav.role)){
    //      for(let k of _userRole){
    //        hasScope= nav.role.indexOf(k)>-1
    //        if(hasScope) break
    //      }
    //    }
    //
    //
    //    //console.log(hasScope)
    //    //设置show
    //    nav.show!==false?nav.show=true:nav.show=false;
    //    if(!hasScope) {
    //      nav.show = false;
    //    }
    //
    //    return nav;
    //  });
    //
    // };
    // let nav = _nav.slice(0)
    // if(_user&&_user.roles){
    //  nav = checkNavDisplay(_nav)
    // }

    return (
      <Menu
        theme='dark'
        // openKeys={this.state.openKeys}
        // onOpenChange={this.onOpenChange}
        mode='inline'
        selectedKeys={[pathname]}
        defaultSelectedKeys={[rootPath.quiz]}
        style={{marginBottom:48}}
        // defaultOpenKeys={collapsed===false?[getSubKey(pathname)]:[]}
        onClick={e => {
          if (e.key === 'login') {
            props.dispatch(logout()).then(result => {
              if (result.error) {
                message.error(result.error.message)
              } else {
                props.pathJump(rootPath.base)
              }
            })
          } else if (e.key === 'username') {
            if (user) {
              props.pathJump(rootPath.personCenter)
            }
          } else {
            props.pathJump(e.key)
          }
        }}
      >
        {nav.map(item => {
          return item.type === 'sub' ? (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span className='nav-text'>{item.name}</span>
                </span>
              }
              style={{ display: item.show ? 'block' : 'none' }}
            >
              {item.child &&
                item.child.map(v => (
                  <Menu.Item key={v.key} style={{ display: v.show ? 'block' : 'none' }}>
                    {v.name}
                  </Menu.Item>
                ))}
            </SubMenu>
          ) : (
            <Menu.Item key={item.key} style={{ display: item.show ? 'block' : 'none' }}>
              <Icon type={item.icon} />
              <span className='nav-text'>{item.name}</span>
            </Menu.Item>
          )
        })}
        <Menu className='divider' />
        <Menu.Item key='username'>
          <div>
            <span>
              <Icon type='user' />
              {userInfo && <span className='nav-text'>{userInfo.getIn(['person', 'name'])}</span>}
            </span>
          </div>
        </Menu.Item>
        <Menu.Item key='login'>
          <span>
            <Icon type='poweroff' />
            <span className='logout'>{formatMessage({ id: 'logout' })}</span>
          </span>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  location: state.get('routing').locationBeforeTransitions,
  user: state.get('user'),
  userInfo: state.getIn(['userInfo', 'userLoginInfo'])
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  pathJump: path => dispatch(pathJump(path))
})
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Side))
