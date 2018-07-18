/*
 * @Author: Mao Guijun
 * @Date: 2018-07-18 11:30:06
 * @Last Modified by: Mao Guijun
 * @Last Modified time: 2018-07-18 19:43:18
 */
import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { pathJump } from '../../../utils/'
import { titles as _tit, rootPath, tableAll } from '../../../config'
import Immutable from 'immutable'
import { fetchQuestion } from '../modules/question'
import { NavBar, Icon, Steps, WingBlank, WhiteSpace, Toast, Modal, Button } from 'antd-mobile'
import './question_.scss'
import { login } from '../../Login/modules/login'
import { encryptAes, encryptSha256 } from '../../../utils/common'
// import QuestionList from './components/questionlist'
const Step = Steps.Step
const alert = Modal.alert

class Question extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStep: 1,
      questionList: [],
      selectList: [],
      toStart: true // 是否点了下一步
    }
  }

  // WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount () {
    const {
      dispatch,
      location: { pathname }
    } = this.props
    const json = {
      mail: '1053475583@qq.com',
      password: encryptAes(`${encryptSha256('Qwerty1.')},${new Date().getTime()}`),
      type: '3',
      equipmentType: '2'
    }
    dispatch(login(json))
    // console.log('pathname', location)
  }

  componentDidMount () {
    const {
      dispatch,
      location: { search }
    } = this.props
    const json = { limit: tableAll, interestFieldIds: search.slice(1) }
    dispatch(fetchQuestion(json)).then(e => {
      if (e.error) {
        console.log(e.error)
        // Toast.info(e.error, 1)
        return
      }
      console.log(57, e)
      this.setState({
        questionList: e.payload.objs
      })
    })
  }

  render () {
    const {
      intl: { formatMessage, locale },
      location: { pathname },
      count,
      question
    } = this.props
    let { sortedInfo, filteredInfo, loading, currentPage, currentStep, questionList, selectList, toStart } = this.state

    return (
      <div className='questionfile'>
        <NavBar
          mode='light'
          icon={<Icon type='left' />}
          onLeftClick={() => console.log('onLeftClick')}
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
        <div className='bar'>
          <div className='bar-item'>
            <div>{12}</div>
            <div />
            <div>{formatMessage({ id: 'questionrest' })}</div>
          </div>
          <div className='bar-item'>
            <div>{5}</div>
            <div />
            <div>{formatMessage({ id: 'questioncorrect' })}</div>
          </div>
          <div className='bar-item'>
            <div>{1}</div>
            <div />
            <div>{formatMessage({ id: 'questionerror' })}</div>
          </div>
          <div className='bar-item'>
            <div>{12}</div>
            <div />
            <div>{formatMessage({ id: 'timerest' })}</div>
          </div>
          <div className='bar-item'>
            <div>{12}</div>
            <div />
            <div>{formatMessage({ id: 'correctrate' })}</div>
          </div>
        </div>
        <div>
          <div className='container'>
            <div className='title'>
              <div>{formatMessage({ id: 'testforquestion' })}</div>
              <span>{formatMessage({ id: 'testtips' })}</span>
            </div>
            <div className='littletitle'>
              <div style={{ marginRight: '0.05rem', lineHeight: '0.08rem' }}>
                {formatMessage({ id: 'youselectquestion' })}
                {':'}
              </div>
            </div>
          </div>
          <div className={'bottomButton nofull'}>
            <Button type='primary' onClick={() => this.jump()}>
              {formatMessage({ id: 'startTest' })}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

Question.propTypes = {
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
  )(Question)
)
