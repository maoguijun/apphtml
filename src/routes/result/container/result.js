/*
 * @Author: Mao Guijun
 * @Date: 2018-07-18 11:30:06
 * @Last Modified by: Mao Guijun
 * @Last Modified time: 2018-08-10 15:20:56
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
  tableAll,
  resultRouter
} from '../../../config'
import Immutable from 'immutable'
import { fetchResult } from '../modules/result'
import { NavBar, Icon, Steps, WingBlank, WhiteSpace, Toast, Modal, Button } from 'antd-mobile'
import './result_.scss'
import { login } from '../../Login/modules/login'
import { encryptAes, encryptSha256, formatSecondToMinute, toFixed } from '../../../utils/common'
// import ResultList from './components/resultlist'
import { postMessage } from '../../../utils/onmessage'
const Step = Steps.Step
const alert = Modal.alert

class Result extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStep: 3,
      result: Immutable.fromJS({})
    }
  }

  // WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount () {
    const result = JSON.parse(localStorage.getItem('testresult') || null)
    console.log(result)
    if (result) {
      this.setState({
        result: Immutable.fromJS(result)
      })
    } else {
      throw new Error('没有获取到考试结果！')
    }
  }
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
  backToApp = () => {
    const {
      intl: { formatMessage }
    } = this.props
    this.setState({
      animating: false
    })
    setTimeout(
      () =>
        alert(
          formatMessage({ id: 'questionbackAlertmessage2' }),
          formatMessage({ id: 'questionbackAlertmessage2tip' }),
          [
            {
              text: formatMessage({ id: 'saveandleave' }),
              onPress: e => {
                postMessage()
              }
            },
            {
              text: formatMessage({ id: 'continuesee' })
            }
          ]
        ),
      100
    )
  }
  renderfield = () => {
    const { result } = this.state
    const {
      location: { locale }
    } = this.props
    const result_ = result.toJS()
    return (
      result_.arr &&
      result_.arr.map((item, index, array) => {
        let style = {}
        if (index !== 0) {
          style = {
            borderLeft: '1px solid #ccc'
          }
        }
        style = {
          ...style,
          width: `${parseInt(100 / array.length)}%`
        }
        console.log(123, style)
        return (
          <div className='fielditem' style={style} key={item.id}>
            <div className='rate'>
              <i>{item.correctRate}</i>
              <span>%</span>
            </div>
            <div className='fieldname'>
              {item.interestField && (locale === 'en' ? item.interestField.name_en : item.interestField.name_zh)}
            </div>
          </div>
        )
      })
    )
  }
  render () {
    const {
      intl: { formatMessage, locale },
      location: { pathname },
      count
    } = this.props
    let { currentStep, result } = this.state

    return (
      <div className='resultfile'>
        <NavBar
          mode='light'
          icon={<Icon onClick={() => console.log('back')} type='left' />}
          leftContent={<span>{formatMessage({ id: 'backToApp' })}</span>}
          onLeftClick={() => {
            this.backToApp()
          }}
        >
          <span>{formatMessage({ id: 'resultTitle' })}</span>
        </NavBar>
        <div>
          <Steps current={currentStep} direction='horizontal' size='small'>
            <Step icon={<div className={'icon_step' + (currentStep > -1 ? ' current' : '')}>1</div>} />
            <Step icon={<div className={'icon_step' + (currentStep > 0 ? ' current' : '')}>2</div>} />
            <Step icon={<div className={'icon_step' + (currentStep > 1 ? ' current' : '')}>3</div>} />
          </Steps>
        </div>
        <div
          style={{
            overflow: 'hidden',
            height: '0.45rem'
          }}
        >
          <div className='huxian'>
            <div className='scoreandtitle'>
              <div className='title'>{formatMessage({ id: 'congratulation' })}</div>
              <div className='time'>
                {formatMessage({ id: 'testingtime' })} {formatSecondToMinute(result.get('testingtime'))}
              </div>
              <div className='title_'>
                <span className='score'>{result.get('allCorrectRate')}</span>
                <span>{formatMessage({ id: 'score' })}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='correctanderror'>
            <div>
              <i className='iconfont correct'>&#xe744;</i>
              <span>{toFixed(result.get('correctsize'), 2)}</span>
              {formatMessage({ id: 'question' })}
            </div>
            <div>|</div>
            <div>
              <i className='iconfont error'>&#xe7ca;</i>
              <span>{toFixed(result.get('errorsize'), 2)}</span>
              {formatMessage({ id: 'question' })}
            </div>
          </div>
          <div className='correctRate'>
            <span>{formatMessage({ id: 'correctRate' })}</span>
            <span>
              {result.get('allCorrectRate')}
              {'%'}
            </span>
          </div>
          <div className='ratewithfield'>{this.renderfield()}</div>
          <div className='introduction'>
            <p>{formatMessage({ id: 'testintroduction1' })}</p>
            <p>{formatMessage({ id: 'testintroduction2' })}</p>
          </div>
        </div>
        <div className={'bottomButton nofull'}>
          <Button
            type='primary'
            onClick={() => {
              postMessage(resultRouter)
            }}
          >
            {formatMessage({ id: 'recommendcourse' })}
          </Button>
        </div>
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
