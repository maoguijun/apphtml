import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { injectIntl, intlShape } from 'react-intl'
// import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon, Form, Input, Button, Row, Col, Steps, message } from 'antd'
import LocaleBtn from '../../../containers/global/LocaleBtn'
const FormItem = Form.Item

import { encryptAes, encryptSha256 } from '../../../utils/common'
import './login.scss'
import { host, rootPath } from '../../../config'

import Radio from 'antd/lib/radio'

import PropTypes from 'prop-types'
import png from '../../../../public/logos/logo1.png'
import png2 from '../../../../public/logos/logo2.png'

const Step = Steps.Step

export class Login extends Component {
  static defaultProps = {}

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      cansub_user: false,
      cansub_pwd: false,
      user: '',
      pwd: '',
      isReset: false,
      current: 0,
      captcha: null,
      count: +new Date(),
      isResetOk: false
    }
  }
  // console.log('page',props)
  componentDidMount () {}

  componentWillUnmount () {}

  changeInput = (state, e) => {
    if (e.target.value !== undefined) {
      this.setState({ [state]: e.target.value })
    }
  }

  sendCode = () => {
    const { mail, identifyCode_1 } = this.state
    const { formatMessage } = this.props.intl
    const { checkCode, SendCodeAgain } = this.props
    if (!mail) return message.error(formatMessage({ id: 'lack_mail' }))
    if (!identifyCode_1) return message.error(formatMessage({ id: 'lack_identifyCode_1' }))
    checkCode({ captcha: identifyCode_1 }).then(e => {
      if (e.error) {
        message.error(e.error.message)
      } else {
        SendCodeAgain({
          mail,
          accountType: '2'
        }).then(e => {
          if (e.error) {
            message.error(e.error.message)
          } else {
            message.success(formatMessage({ id: 'send_ok' }))
            this.setState({ current: 1 })
          }
        })
      }
    })
  }

  nextStep = () => {
    const { mailCode, mail } = this.state
    const { formatMessage } = this.props.intl
    const { checkMailCode } = this.props
    if (!mailCode) return message.error(formatMessage({ id: 'lack_identifyCode_1' }))
    checkMailCode({
      verificationCode: mailCode,
      mail,
      accountType: '2'
    }).then(e => {
      if (e.error) {
        message.error(e.error.message)
      } else {
        this.setState({ current: 2 })
      }
    })
  }

  sendCodeAgain = () => {
    const { SendCodeAgain } = this.props
    const { formatMessage } = this.props.intl
    const { mail } = this.state
    SendCodeAgain({
      mail,
      accountType: '2'
    }).then(e => {
      if (e.error) {
        message.error(e.error.message)
      } else {
        message.success(formatMessage({ id: 'send_ok' }))
      }
    })
  }

  setPwd = () => {
    const { newPwd2, newPwd, mailCode, mail } = this.state
    const { formatMessage } = this.props.intl
    if (newPwd !== newPwd2) return message.warn(formatMessage({ id: 'twoPwdDiff' }))
    const { forgetPwd } = this.props
    forgetPwd({
      verificationCode: mailCode,
      mail,
      accountType: '2',
      password: encryptSha256(newPwd)
    }).then(e => {
      if (e.error) {
        message.error(e.error.message)
      } else {
        message.success(formatMessage({ id: 'updateSuccess' }), 1)
        this.setState({ isReset: false })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { formatMessage } = this.props.intl
    const {
      loading,
      user,
      pwd,
      isReset,
      current,
      mail,
      identifyCode_1,
      mailCode,
      count,
      newPwd2,
      newPwd,
      isResetOk
    } = this.state
    const baseLeft = 6
    const baseRight = 17
    const formItemLayout = {
      labelCol: { span: baseLeft },
      wrapperCol: { span: baseRight }
    }

    const username = formatMessage({ id: 'login_username' })
    const password = formatMessage({ id: 'login_password' })

    let renderColumn = v => {
      if (v === 0) {
        return (
          <Row type='flex' justify='center' style={{ marginTop: 32 }}>
            <Row style={{ width: '100%' }}>
              <Row type='flex' style={{ marginBottom: 16 }}>
                <Col span={6} style={{ textAlign: 'right', lineHeight: '40px', paddingRight: 8 }}>
                  <span>{formatMessage({ id: 'mail' })} : </span>
                </Col>
                <Col span={18}>
                  <Input
                    value={mail}
                    onChange={this.changeInput.bind(this, 'mail')}
                    style={{ height: 40, width: 320 }}
                  />
                </Col>
              </Row>
              <Row type='flex' style={{ marginBottom: 16 }}>
                <Col style={{ textAlign: 'right', lineHeight: '40px', paddingRight: 8 }} span={6}>
                  <span>{formatMessage({ id: 'identifyCode' })} : </span>
                </Col>
                <Col span={18}>
                  <Input
                    value={identifyCode_1}
                    onChange={this.changeInput.bind(this, 'identifyCode_1')}
                    style={{ width: 188, marginRight: 16, height: 40, float: 'left' }}
                  />
                  <div style={{ height: 40, border: '1px solid #d9d9d9', float: 'left' }}>
                    <img className='catp' src={`${host}/captcha/?${count}`} />
                  </div>
                  <a
                    style={{ marginLeft: 16, lineHeight: '40px', height: 40 }}
                    onClick={() => this.setState({ count: this.state.count + 1 })}
                  >
                    {formatMessage({ id: 'changeCode' })}
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={18} offset={6}>
                  <Button
                    type='primary'
                    style={{ width: 320, height: 40, marginTop: 8, padding: '8px 16px', marginRight: 8 }}
                    onClick={this.sendCode}
                  >
                    {formatMessage({ id: 'sendCode' })}
                  </Button>
                </Col>
                <Col span={18} offset={6}>
                  <a style={{ lineHeight: '48px' }} onClick={() => this.setState({ isReset: false })}>
                    {formatMessage({ id: 'backToLogin' })}
                  </a>
                </Col>
              </Row>
            </Row>
          </Row>
        )
      } else if (v === 1) {
        return (
          <Row type='flex' justify='center' style={{ marginTop: 32 }}>
            <Row style={{ width: '100%' }}>
              <Row type='flex' style={{ marginBottom: 24 }}>
                <Col style={{ marginRight: 22, lineHeight: '40px', paddingRight: 8, textAlign: 'right' }} span={8}>
                  {formatMessage({ id: 'account' })} :{' '}
                </Col>
                <Col style={{ width: 216, lineHeight: '40px', marginLeft: 28 }} span={16}>
                  {mail}
                </Col>
              </Row>
              <Row type='flex' style={{ marginBottom: 24 }}>
                <Col span={8} style={{ paddingRight: 8, textAlign: 'right', lineHeight: '40px' }}>
                  <span>{formatMessage({ id: 'mailCode' })} : </span>
                </Col>
                <Col span={16}>
                  <Input
                    value={mailCode}
                    onChange={this.changeInput.bind(this, 'mailCode')}
                    style={{ width: 320, height: 40 }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={16} offset={8}>
                  <Button type='primary' style={{ marginTop: 12, width: 320, height: 40 }} onClick={this.nextStep}>
                    {formatMessage({ id: 'nextStep' })}
                  </Button>
                </Col>
                <Col span={16} offset={8} style={{ textAlign: 'left', marginTop: 8 }}>
                  <a onClick={this.sendCodeAgain}>{formatMessage({ id: 'sendCodeAgain' })}</a>
                </Col>
              </Row>
            </Row>
          </Row>
        )
      } else if (v === 2) {
        return (
          <Row type='flex' justify='center' style={{ marginTop: 32 }}>
            {!isResetOk ? (
              <Row style={{ width: '100%' }}>
                <Row type='flex' style={{ marginBottom: 24 }}>
                  <Col span={8} style={{ paddingRight: 8, lineHeight: '40px', textAlign: 'right' }}>
                    <span>{formatMessage({ id: 'newPwd' })} : </span>
                  </Col>
                  <Col span={16}>
                    <Input
                      type='password'
                      value={newPwd}
                      maxLength='20'
                      onChange={this.changeInput.bind(this, 'newPwd')}
                      style={{ width: 320, height: 40 }}
                    />
                  </Col>
                </Row>
                <Row type='flex' style={{ marginBottom: 24 }}>
                  <Col span={8} style={{ paddingRight: 8, lineHeight: '40px', textAlign: 'right' }}>
                    <span>{formatMessage({ id: 'newPwd2' })} : </span>
                  </Col>
                  <Col span={16}>
                    <Input
                      type='password'
                      value={newPwd2}
                      maxLength='20'
                      onChange={this.changeInput.bind(this, 'newPwd2')}
                      style={{ width: 320, height: 40 }}
                    />
                  </Col>
                </Row>
                <Row type='flex' justify='center'>
                  <Col span={16} offset={8}>
                    <Button type='primary' style={{ height: 40, marginTop: 16, width: 320 }} onClick={this.setPwd}>
                      {formatMessage({ id: 'done' })}
                    </Button>
                  </Col>
                </Row>
              </Row>
            ) : (
              <Row type='flex' style={{ alignItems: 'center', flexDirection: 'column', marginTop: 16 }}>
                <Row type='flex'>
                  <Icon type='check-circle-o' style={{ fontSize: '42px', color: 'green', marginRight: 24 }} />
                  <div style={{ lineHeight: '42px' }}>{formatMessage({ id: 'resetOk' })}</div>
                </Row>
                <Button
                  style={{ marginTop: 16, width: 130 }}
                  onClick={() =>
                    this.setState({
                      isReset: false,
                      current: 0,
                      mail: '',
                      identifyCode_1: '',
                      mailCode: '',
                      newPwd2: '',
                      newPwd: ''
                    })
                  }
                >
                  {formatMessage({ id: 'done' })}
                </Button>
              </Row>
            )}
          </Row>
        )
      }
    }

    return (
      <Row>
        {
          <div className='login logo-gather-demo-wrapper'>
            {!isReset ? (
              <Col className='login-wrap'>
                <div className='prop-title'>
                  <img src={png} />
                </div>
                {/* <LocaleBtn /> */}
                <Form
                  hideRequiredMark
                  onSubmit={e => {
                    e.preventDefault()
                    this.setState({ loading: true })
                    this.props.form.validateFields((err, values) => {
                      if (!err) {
                        values.password = encryptAes(`${encryptSha256(values.password)},${new Date().getTime()}`)
                        values.type = '2'
                        values.equipmentType = '1'
                        this.props.login(values).then(e => {
                          if (e.error) {
                            message.error(e.error.message)
                            this.setState({ loading: false })
                          } else {
                            if (e.payload) {
                              console.log('ppppp', e)
                              this.props.pathJump(rootPath.quiz)
                            }
                          }
                        })
                      }
                      // console.log(values)
                    })
                  }}
                >
                  <p>{formatMessage({ id: 'Project_Title' })}</p>
                  {/* <Col offset={baseLeft} span={baseRight}>
              <Alert message={formatMessage({ id: 'login_alert' })} type='info' showIcon />
            </Col> */}

                  <FormItem label={null}>
                    {getFieldDecorator('mail', {
                      initialValue: user, // A_general superMan
                      rules: [{ required: true, message: formatMessage({ id: 'input_require' }, { name: username }) }]
                    })(
                      <Input
                        style={{ marginBottom: 20 }}
                        prefix={<Icon type='user' style={{ fontSize: 13 }} />}
                        placeholder={formatMessage({ id: 'input_placeholder' }, { name: username })}
                      />
                    )}
                  </FormItem>
                  <FormItem label={null}>
                    {getFieldDecorator('password', {
                      initialValue: pwd,
                      rules: [{ required: true, message: formatMessage({ id: 'input_require' }, { name: password }) }]
                    })(
                      <Input
                        style={{ marginBottom: 20 }}
                        prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
                        placeholder={formatMessage({ id: 'input_placeholder' }, { name: password })}
                        type='password'
                      />
                    )}
                  </FormItem>
                  <Row style={{ marginTop: 16 }}>
                    <Col id='login_btn'>
                      <Button type='primary' htmlType='submit' style={{ width: '100%' }} size='large' loading={loading}>
                        {formatMessage({ id: 'login_login' })}
                      </Button>
                    </Col>
                    <a
                      style={{ float: 'right', marginTop: 6 }}
                      onClick={() => {
                        this.setState({ isReset: true })
                      }}
                    >
                      {formatMessage({ id: 'mis_pwd' })}
                    </a>
                  </Row>
                </Form>
              </Col>
            ) : (
              <Col className='login-wrap reset-container'>
                <div className='prop-title' style={{ top: '-99px', left: 0 }}>
                  <img src={png} />
                </div>
                <Row style={{ maxWidth: 600, margin: '16px auto' }}>
                  <Steps current={current} style={{ margin: '24px 0' }}>
                    <Step title={formatMessage({ id: 'step1' })} />
                    <Step title={formatMessage({ id: 'step2' })} />
                    <Step title={formatMessage({ id: 'step3' })} />
                  </Steps>
                  <Row>{renderColumn(current)}</Row>
                </Row>
              </Col>
            )}
          </div>
        }
      </Row>
    )
  }
}

Login.propTypes = {
  form: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired
}

class CheckLogin extends React.Component {
  // componentWillMount(){
  //   let page = '';
  //   //console.log('CheckLogin',this.props)
  //   if(this.props.user && this.props.user.get('status')===fetchState.success){
  //     let _user = this.props.user.toJS();
  //
  //     // _user.roles.map(v=>{
  //     //   switch (v.id){
  //     //     case 'applicant':page = '/my-list/waiting';
  //     //           break;
  //     //     case 'manager':page = '/supervisor/approving';
  //     //           break;
  //     //     default:page = null;
  //     //   }
  //     // })
  //     //
  //     // this.setState({page})
  //     this.props.pathJump(this.props.location.query.next || '/my-list/waiting')
  //   }
  // }
  render () {
    return (
      <div style={{ position: 'relative' }}>
        <Login
          image={'https://zos.alipayobjects.com/rmsportal/NbWTEbiswBhrRBU.svg'}
          pixSize={20}
          pointSizeMin={10}
          {...this.props}
          page={this.props.user.toJS().roles}
        />
      </div>
    )
  }
}

export default Form.create()(injectIntl(CheckLogin))
