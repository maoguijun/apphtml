/**
 * Created by Yurek on 2017/5/12.
 */
import React from 'react'
import { Form, Row, Col, Input, Button, Icon, DatePicker, Card, Select } from 'antd'
const { MonthPicker, RangePicker } = DatePicker
import {rootPath,secondRouter} from '../../config'
import { injectIntl } from 'react-intl'
import LocaleBtn from '../../containers/global/LocaleBtn'

class Header extends React.Component {
  state = {
  }

  setRoute = (string) => {
    let result = string.split('/')
    if(secondRouter.length>0){
      return result[2]
    }else{
      return result[1]
    }
  }


  render () {
    const { route } = this.props
    const { formColumns, rightContent, expand, expandForm, intl: { formatMessage } } = this.props
    const _route = this.setRoute(route)
    console.log('path:',route)
    return (
      <Row style={{height:67,background:'#fff', lineHeight:'67px',boxShadow: 'rgba(0, 21, 41, 0.08) 0px 1px 4px', position:'fixed',width:'100%',zIndex:'99'}}>
        <p style={{fontSize:'23px',paddingLeft:'23px',color:'#000'}}>{formatMessage({id:_route})}</p>
        {<Row style={{position:'absolute',right:'282px',top:0}}>
          {<LocaleBtn />}
        </Row>}
      </Row>
    )
  }
}


export default injectIntl(Header)
