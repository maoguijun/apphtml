import React from 'react'
import {injectIntl} from 'react-intl'
import { Menu } from 'antd';
import './NavBody.scss'
const MenuItem=Menu.Item

class NavBody extends React.PureComponent{
  static  contextTypes={
    router: React.PropTypes.object.isRequired
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render(){
    const {intl:{formatMessage},location:{pathname},rootPath,chilPath,rightContent}=this.props;
    return (
      <div className="layout-right">
        <div className="top-header">
          <Menu
            mode="horizontal"
            onOpenChange={this.onOpenChange}
            selectedKeys={[pathname.replace(/\/?$|.*\//,'')]}
            onClick={e=>this.context.router.push(`${pathname.replace(/\/?$|[^\/]+$/,'')}${e.key}`)}
          >
            {Object.keys(chilPath).map(
              key=><MenuItem key={key}>{formatMessage({id:`${rootPath}_${key}`})}</MenuItem>
            )}
          </Menu>
          <div className="action-btn">{rightContent&&rightContent(formatMessage)}</div>
        </div>
        {this.props.children}
      </div>
    )
  }
}
export default  injectIntl(NavBody)
