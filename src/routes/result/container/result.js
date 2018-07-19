/*
 * @Author: Mao Guijun
 * @Date: 2018-07-18 11:30:06
 * @Last Modified by: Mao Guijun
 * @Last Modified time: 2018-07-19 20:01:29
 */
import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { pathJump } from '../../../utils/'
import {
  titles as _tit,
  resultStatus,
  result_tableResult as _result,
  resultReplyStatus,
  rootPath,
  tableAll
} from '../../../config'
import Immutable from 'immutable'
import { fetchResult } from '../modules/result'
import { NavBar, Icon, Steps, WingBlank, WhiteSpace, Toast, Modal, Button } from 'antd-mobile'
import './result_.scss'
import { login } from '../../Login/modules/login'
import { encryptAes, encryptSha256 } from '../../../utils/common'
// import ResultList from './components/resultlist'
const Step = Steps.Step
const alert = Modal.alert

class Result extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStep: 3,
      resultList: [],
      selectList: [],
      toStart: false // 是否点了下一步
    }
  }

  // // WARNING! To be deprecated in React v17. Use componentDidMount instead.
  // componentWillMount () {
  //   const { dispatch } = this.props
  //   const json = {
  //     mail: '1053475583@qq.com',
  //     password: encryptAes(`${encryptSha256('Qwerty1.')},${new Date().getTime()}`),
  //     type: '3',
  //     equipmentType: '2'
  //   }
  //   dispatch(login(json))
  // }

  // componentDidMount () {
  //   const { dispatch } = this.props
  //   dispatch(fetchResult({ limit: tableAll })).then(e => {
  //     if (e.error) {
  //       console.log(e.error)
  //       // Toast.info(e.error, 1)
  //       return
  //     }
  //     console.log(57, e)
  //     this.setState({
  //       resultList: e.payload.objs
  //     })
  //   })
  // }
  /** 点击item */
  onItemChange = obj => {
    let { selectList } = this.state
    const {
      intl: { formatMessage }
    } = this.props

    // 如果selectlist 里已经有了则删掉，否则添加
    console.log(68, selectList.some(item => obj.id === item.id))
    if (selectList.some(item => obj.id === item.id)) {
      selectList = selectList.filter(item => item.id !== obj.id)
    } else {
      // 判断是否已经有三个了
      if (selectList.length > 2) {
        setTimeout(
          () => alert(formatMessage({ id: 'resultAlertmessage' }), '', [{ text: formatMessage({ id: 'Iget' }) }]),
          100
        )
      } else {
        selectList.push(obj)
      }
    }
    this.setState({
      selectList
    })
  }
  jump = () => {
    const { selectList } = this.state
    const { dispatch } = this.props
    let string = ''
    const len = selectList.length
    selectList.forEach(({ id }, index) => {
      string += id
      if (index < len) {
        string += ','
      }
    })
    console.log(string)
    dispatch(pathJump(`${rootPath.question}?${string}`))
  }
  render () {
    const {
      intl: { formatMessage, locale },
      location: { pathname },
      count,
      result
    } = this.props
    let { sortedInfo, filteredInfo, loading, currentPage, currentStep, resultList, selectList, toStart } = this.state

    return (
      <div className='resultfile'>
        <NavBar
          mode='light'
          // icon={<Icon type='left' />}
          // onLeftClick={() => console.log('onLeftClick')}
          // rightContent={[
          //   <Icon key='0' type='search' style={{ marginRight: '16px' }} />,
          //   <Icon key='1' type='ellipsis' />
          // ]}
        >
          <span>{formatMessage({ id: 'appTitle' })}</span>
        </NavBar>
        <div>
          <Steps current={currentStep} direction='horizontal' size='small'>
            <Step icon={<div className={'icon_step' + (currentStep > -1 ? ' current' : '')}>1</div>} />
            <Step icon={<div className={'icon_step' + (currentStep > 0 ? ' current' : '')}>2</div>} />
            <Step icon={<div className={'icon_step' + (currentStep > 1 ? ' current' : '')}>3</div>} />
          </Steps>
        </div>
        {!toStart && (
          <div>
            <div className='container'>
              <div className='title'>
                <div>{formatMessage({ id: 'plxselectfild' })}</div>
                <span>{formatMessage({ id: 'plxselectlessthen3' })}</span>
              </div>
              {/* <ResultList
                dataSource={resultList}
                {...this.props}
                selectList={selectList}
                onItemChange={this.onItemChange}
              /> */}
            </div>
            <div className={'bottomButton' + (!selectList.length ? ' disabled' : '')}>
              <Button type='primary' disabled={!selectList.length} onClick={() => this.setState({ toStart: true })}>
                {formatMessage({ id: 'nextStep' })}
              </Button>
            </div>
          </div>
        )}
        {toStart && (
          <div>
            <div className='container'>
              <div className='title'>
                <div>{formatMessage({ id: 'testforresult' })}</div>
                <span>{formatMessage({ id: 'testtips' })}</span>
              </div>
              <div className='littletitle'>
                <div style={{ marginRight: '0.05rem', lineHeight: '0.08rem' }}>
                  {formatMessage({ id: 'youselectresult' })}
                  {':'}
                </div>
                <div>
                  {selectList.map(item => (
                    <span key={item.id} className='youselectitem'>
                      {locale === 'en' ? item.name_en : item.name_zh}
                    </span>
                  ))}
                </div>
                <div className='testcontent'>{formatMessage({ id: 'testcontent' })}</div>
              </div>
            </div>
            <div className={'bottomButton nofull'}>
              <Button type='primary' onClick={() => this.jump()}>
                {formatMessage({ id: 'startTest' })}
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

Result.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => {
  console.log(state && state.toJS())
  return {}
}
// const mapDispatchToProps = dispatch => {
//   console.log(dispatch)
//   return {
//     ...bindActionCreators(actionCreators, dispatch)
//   }
// }

export default injectIntl(
  connect(
    mapStateToProps
    // mapDispatchToProps
  )(Result)
)
