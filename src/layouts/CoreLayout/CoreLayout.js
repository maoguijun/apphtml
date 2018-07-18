import React from 'react'
import Nav from '../../containers/sider/Nav'
import Header from '../../containers/header/header'
import User from '../../containers/sider/User'
import './CoreLayout.scss'
import { Layout, Icon, Row } from 'antd'
const { Content, Sider } = Layout
import TopSearch from '../../components/search/topSearch'
// const _logo1 = require('../../../public/02.png')
// const _logo2 = require('../../../public/logo.png')
import logo1 from '../../../public/logos/logo1.png'
class CoreLayout extends React.Component {
  state = {
    // collapsed: eval(sessionStorage.getItem('collapsed')||false),
    collapsed: false,
    mode: 'inline'
  }

  onCollapse = collapsed => {
    // sessionStorage.setItem("collapsed",collapsed)
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    })
  }

  render () {
    console.log('kikikkii', this.props)
    return (
      <Layout className='layout-main'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          width={180}
          className='sider-main'
        >
          <div className='logo'>
            <img src={logo1} width='150%' height='40px' />
          </div>
          {/* <User /> */}
          <Nav mode={this.state.mode} collapsed={this.state.collapsed} />
        </Sider>
        <Layout style={{ overflowX: 'hidden', background: '#f0f2f5' }}>
          <Header route={this.props.location.pathname} />
          <Content className='content'>
            <div className='content-wrap'>{this.props.children}</div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
