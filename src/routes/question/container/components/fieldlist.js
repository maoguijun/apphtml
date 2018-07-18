/*
 * @Author: Mao Guijun
 * @Date: 2018-07-18 11:29:58
 * @Last Modified by: Mao Guijun
 * @Last Modified time: 2018-07-18 16:57:11
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { locale } from '../../../../config'
import { ListView, Card, Icon } from 'antd-mobile'
import './fieldlist_.scss'

class FieldList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: props.dataSource || [],
      isLoading: true,
      selectList: props.selectList || []
    }
  }

  // WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps (nextProps) {
    console.log(24, nextProps)
    this.setState({
      dataSource: nextProps.dataSource,
      selectList: nextProps.selectList
    })
  }
  renderlist = () => {
    const { dataSource, selectList } = this.state
    const {
      location: { locale },
      onItemChange
    } = this.props
    console.log(33, dataSource)
    return (
      dataSource &&
      dataSource.map(item => (
        <div
          key={item.id}
          className={'fileitem' + (selectList.some(obj => obj.id === item.id) ? ' onselect' : '')}
          onTouchEnd={() => onItemChange(item)}
        >
          <Icon type='check-circle' className='icon' />
          <Card>
            <Card.Body>
              <div>{locale === 'en' ? item.name_en : item.name_zh}</div>
            </Card.Body>
          </Card>
        </div>
      ))
    )
  }
  render () {
    const { dataSource } = this.state
    return (
      <div className='components_filedlist'>
        <div className='fileList'>{this.renderlist()}</div>
      </div>
    )
  }
}
export default injectIntl(FieldList)
