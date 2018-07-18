import { connect } from 'react-redux'
import {  login ,checkCode,checkMailCode ,SendCodeAgain, forgetPwd} from '../modules/login'
import { pathJump } from '../../../utils/'

import Login from '../components/Login'

const mapDispatchToProps = {
  login,
  pathJump,
  checkCode,
  checkMailCode,
  SendCodeAgain,
  forgetPwd
}


const mapStateToProps = (state) => ({
  user : state.get('user'),
  captcha:state.get('captcha')
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
