import { quiz_tableField as _quiz, personalCenter_info as _perT, homework_tableField as _homeT } from '../config'

const language = {
  //  global
  plxlogin: 'please sign in',
  input_require: 'Please input your {name}',
  input_placeholder: '{name}',
  locale: '中文',
  //  login
  login_alert: 'alert',
  login_username: 'Account',
  login_password: 'Password',
  login_login: 'Login as faculty',
  logout: 'Logout',

  Project_Title: 'Login',

  mis_pwd: 'Forget Password',
  identifyCode: 'Verification code',
  mail: 'Email',
  changeCode: 'Change',
  sendCode: 'Press to send the email to re-setup password ',
  lack_mail: 'Please enter email',
  lack_identifyCode_1: 'Please enter verification code',
  codeError: 'Incorrect verification code',
  account: 'Account',
  mailCode: 'Email Verification Code',
  nextStep: 'Next Step',
  sendCodeAgain: 'Have not received verification code? Resend an email',
  newPwd: 'New Password',
  newPwd2: 'Confirm New Password',
  done: 'Done',
  twoPwdDiff: 'Inconsistent Passwords',
  send_ok: 'Sent successfully',
  resetOk: 'You have successfully reset your password, Please login from the homepage',
  detail: 'Detail',
  reply: 'Replied',
  notReply: 'Unreplied',
  quizDesc: 'Description',
  time: 'Time',
  loading: 'Loading',
  quizReply: 'Answer',
  step1: 'Account confirmation',
  step2: 'Safety verificaiton',
  step3: 'Reset Password',
  changePwd: 'Change Password',
  back: 'Return',
  submit: 'Submit',
  submit_success: 'Successfully submitted',
  input_warn: 'Please input reply !',
  inputPlaceholder: 'Please enter',
  input_complete: 'Please input {name} correctly',
  twoPwdWarn: 'Inconsistent Passwords',
  submitted: 'Submitted',
  needModify: 'modification needed',
  completed: 'Completed',
  homeworkInfo: 'Homework Details',
  workName: 'Homework Name',
  student: 'Student',
  submitTime: 'Submitted Time',
  attachment: 'Attachment',
  reviewWork: 'Homework Revision',
  homeworkStatus: 'Status',
  uploadPro: 'Upload Profile Photo',
  plsUpload: 'Please upload',
  changeName: 'Change name',
  updateSuccess: 'Successfully modified',
  uploadSuccess: 'Succesfully uploaded',
  backToLogin: 'Login with existing accounts',
  expandSearch: 'Advance Search',
  search: 'Search',
  clear: 'Clear',
  homework_Status: 'Homework Status',
  qStudent: 'Student',
  quiz_Status: 'Status',
  // sider

  quiz: 'Quiz',
  quizInfo: 'Quiz Details',
  homework: 'Homework',
  personCenter: 'Personal Dashboard',

  // search

  // quiz
  [`quiz_${_quiz.course}`]: 'Course',
  [`quiz_${_quiz.chapter}`]: 'Chapter',
  [`quiz_${_quiz.updatedAt}`]: 'Updated Time',
  [`quiz_${_quiz.qPerson}`]: 'Student',
  [`quiz_${_quiz.replyStatus}`]: 'Update Status',
  [`quiz_${_quiz.courseName}`]: 'Course Name',
  [`quiz_${_quiz.operation}`]: 'Operation',
  [`quiz_${_quiz.chapterName}`]: 'Chapter Name',
  [`quiz_${_quiz.qPersonName}`]: 'Student',

  // personal center

  [`personalInfo_${_perT.mail}`]: 'Account',
  [`personalInfo_${_perT.lastLoginTime}`]: 'Last login time',
  [`personalInfo_${_perT.username}`]: 'Name',
  [`personalInfo_${_perT.position}`]: 'Position',
  [`personalInfo_${_perT.field}`]: 'Profession',

  // homework
  [`homework_${_homeT.chapter}`]: 'Chapter',
  [`homework_${_homeT.course}`]: 'Course',
  [`homework_${_homeT.courseName}`]: 'Course',
  [`homework_${_homeT.updatedAt}`]: 'Updated Time',
  [`homework_${_homeT.student}`]: 'Student',
  [`homework_${_homeT.taskStatus}`]: 'Update status',
  [`homework_${_homeT.operation}`]: 'Operation'
}
export default language
