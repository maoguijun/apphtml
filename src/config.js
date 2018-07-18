exports.locale = {
  cn: 'zh',
  en: 'en'
}
export const AESKey = 'AGtJxHXhSqNdwKo0Tb3VOfEgYnp2DrLI'
// export const picURL = 'http://youplustest.oss-cn-shanghai.aliyuncs.com/'
// export const picURL = '//ossyouplustesting.businesstrainingshpwc.com/' // 线上url
export const picURL = '//ossyoupluselearning.businesstrainingshpwc.cn/' // 线上正式url
export const tableLimit = 20
export const tableAll = 99999
exports.host = '/api'
exports.serverurl = '/api'
exports.fetchState = {
  success: 'success'
}

export const secondRouter = process.env.NODE_ENV === 'development' ? '' : '/teacher'

let _rootPath = {
  base: '/',
  quiz: '/quiz',
  homework: '/homework',
  personCenter: '/personCenter',
  quizInfo: '/quizInfo',
  homeworkInfo: '/homeworkInfo',
  login: '/login',

  field: '/field',
  question: '/question'
}

for (let k in _rootPath) {
  _rootPath[k] = secondRouter + _rootPath[k]
}

exports.rootPath = _rootPath

export let titles = {
  bill_to: 'bill_to',
  student: 'student',
  studentDetail: 'studentDetail',
  teacher: 'teacher',
  teacherDetail: 'teacherDetail',
  newTeacher: 'newTeacher',
  company: 'company',
  course: 'course',
  question: 'question',
  courseType: 'courseType'
}
for (let key in titles) {
  titles[key] = `title_${titles[key]}`
}

exports.quizReplyStatus = {
  reply: 1, // 回复
  notReply: 0 // 未回复
}

exports.homeworkTaskStatus = {
  submitted: 1, //  已提交
  needModify: 2, // 需修改
  completed: 3 // 已完成
}

exports.homeworkHandleStatus = {
  needModify: 2, // 需修改
  completed: 3 // 已完成
}

export const personalFieldList = [
  {
    en: 'Marketing and Communications',
    zh: '财经'
  },
  {
    en: 'Management skills and Communication/influence skills',
    zh: '绘画'
  },
  {
    en: 'International Relations/MNCs/Global Leadership/Innovation',
    zh: '计算机'
  },
  {
    en: 'Human resources and consulting skills',
    zh: '唱歌'
  },
  {
    en: 'Consulting/business process/technology transformation',
    zh: '跳舞'
  }
]

// 激活状态
export const activeStatus = {
  '0': 'not_active',
  '1': 'activeted'
}

export const status = {
  '0': 'deleted',
  '1': 'normal'
}

// 用户类型
export const accountType = {
  '0': 'admin',
  '1': 'companyAdmin',
  '2': 'teacher',
  '3': 'student'
}

// 性别
export const gender = {
  '0': 'x',
  '1': 'male',
  '2': 'female'
}

// 学生类型
export const studentTypeArr = {
  '1': 'companyStudent',
  '2': 'normalStudent'
}

// 课程类型
export const courseType = {
  '1': 'recordedBroadcast',
  '2': 'live',
  '3': 'offLive'
}

// 广告类型
export const advertisingType = {
  '1': 'course',
  '2': 'link'
}

// 学生是否有权学习
export const learningAuthority = {
  '0': 'no',
  '1': 'yes'
}

// 课程 章节 视频 学习状态
export const learningStatus = {
  '0': 'notStart',
  '1': 'finished'
}

// 提问回复类型

export const questionReplyType = {
  '1': 'question',
  '2': 'reply'
}

// 学员类型
export const studentType = [
  {
    label: '个人学员',
    value: '2'
  },
  {
    label: '公司学员',
    value: '1'
  }
]
// 账号状态类型
export const FlowStatus = [
  {
    label: '未激活',
    value: '0'
  },
  {
    label: '已激活',
    value: '1'
  }
]
// 提问状态
export const questionStatus = [
  {
    label: '待回答',
    value: '1'
  },
  {
    label: '已回答',
    value: '2'
  }
]

// 提问回复类型

exports.questionReplyType = {
  '0': 'question',
  '1': 'reply'
}

// 提问回复已读状态
exports.haveRead = {
  yes: 1,
  no: 0
}

// 专业领域
export const fieldList = ['财经', '绘画', '计算机', '唱歌', '跳舞']
export const fieldListConfig = {
  '1': '财经',
  '2': '绘画',
  '3': '计算机',
  '4': '唱歌',
  '5': '跳舞'
}
export const fieldListOption = [
  {
    label: '财经',
    value: '1'
  },
  {
    label: '绘画',
    value: '2'
  },
  {
    label: '计算机',
    value: '3'
  },
  {
    label: '唱歌',
    value: '4'
  },
  {
    label: '跳舞',
    value: '5'
  }
]

// // 课程类别
// export const courseTypeList = ['财经', '绘画', '计算机', '唱歌', '跳舞']
// 搜索
export const search_item = {
  flowStatus: 'flowStatus',
  id_like: 'id_like',
  'billingPlan.flowStatus': 'status',
  'clientPoDetail.description_like': 'clientPoDetail.description_like',
  'clientPoDetail.clientPoType': 'clientPoDetail.clientPoType',
  'clientPoDetail.sentToId': 'clientPoDetail.sentToId',
  'clientPoDetail.billToId': 'clientPoDetail.billToId',
  'clientPoDetail.placedToId': 'clientPoDetail.placedToId',
  'clientPoDetail.currencyId': 'clientPoDetail.currencyId',
  'clientPoDetail.clientId': 'clientPoDetail.clientId',
  budgetType: 'budgetType',
  budgetType_in: 'budgetType_in',

  studentType: 'studentType',
  mail: 'mail'
}
export const student_tableField = {
  name: 'name',
  mobile: 'mobile',
  mail: 'mail',
  position: 'position',
  companyName: 'companyName',
  studentType: 'studentType',
  flowStatus: 'flowStatus',
  detaile: 'detail',
  createdAt: 'createdAt',
  lastLoginTime: 'lastLoginTime',
  status: 'status',
  updatedAt: 'updatedAt',
  workExperience: 'workExperience',
  groupNameEn: 'groupNameEn',
  groupNameZh: 'groupNameZh',
  birthday: 'birthday',
  nickName: 'nickName',
  message: 'message'
}
export const teacher_tableField = {
  name: 'name',
  mobile: 'mobile',
  mail: 'mail',
  position_en: 'position_en',
  position_zh: 'position_zh',
  companyName: 'companyName',
  studentType: 'studentType',
  flowStatus: 'flowStatus',
  detaile: 'detail',
  createdAt: 'createdAt',
  status: 'status',
  updatedAt: 'updatedAt',
  workExperience: 'workExperience',
  groupName: 'groupName',
  age: 'age',
  nickname: 'nickname',
  field: 'field',
  username: 'username',
  password: 'password',
  description: 'description',
  introduction_zh: 'introduction_zh',
  introduction_en: 'introduction_en'
}
export const company_tableField = {
  name: 'name',
  mobile: 'mobile',
  mail: 'mail',
  position: 'position',
  companyOperationer: 'companyOperationer',
  createdUser: 'createdUser',
  companyName: 'companyName',
  studentType: 'studentType',
  flowStatus: 'flowStatus',
  detaile: 'detail',
  createdAt: 'createdAt',
  status: 'status',
  updatedAt: 'updatedAt',
  companyType: 'companyType',
  startDt: 'startDt',
  endDt: 'endDt',
  address: 'address',
  size: 'size',
  website: 'website',
  maxPersonCount: 'maxPersonCount'
}
export const course_tableField = {
  name_zh: 'name_zh',
  name_en: 'name_en',
  mobile: 'mobile',
  mail: 'mail',
  position: 'position',
  companyOperationer: 'companyOperationer',
  createdUser: 'createdUser',
  companyName: 'companyName',
  studentType: 'studentType',
  flowStatus: 'flowStatus',
  detaile: 'detail',
  createdAt: 'createdAt',
  courseStatus: 'courseStatus',
  status: 'status',
  updatedAt: 'updatedAt',
  workExperience: 'workExperience',
  groupName: 'groupName',
  age: 'age',
  nickname: 'nickname',
  field: 'field',
  username: 'username',
  password: 'password',
  description: 'description',
  categoryIds: 'categoryIds',
  courseHours: 'courseHours',
  description_zh: 'description_zh',
  description_en: 'description_en',
  demoVideo: 'demoVideo',
  startDt: 'startDt',
  endDt: 'endDt',
  courseType: 'courseType',
  videoName: 'videoName',
  categories: 'categories',
  teacherIds: 'teacherIds',
  order: 'order',
  operation: 'operation',
  duration: 'duration',
  chapterId: 'chapterId',
  teacherId: 'teacherId',
  videoType: 'videoType'
}
export const question_tableField = {
  course: 'course',
  courseName_en: 'courseName_en',
  chapter: 'chapter',
  chapterName_en: 'chapterName_en',
  updatedAt: 'updatedAt',
  qPerson: 'qPerson',
  tPerson: 'tPerson',
  detail: 'detail',
  type: 'type',
  replyStatus: 'replyStatus',
  content: 'content',
  replyContent: 'replyContent'
}

export const quiz_tableField = {
  detaile: 'detail',
  updatedAt: 'updatedAt',
  status: 'status',
  id: 'id',
  course: 'course',
  replyStatus: 'replyStatus',
  operation: 'operation',
  chapter: 'chapter',
  qPerson: 'qPerson',
  courseName: 'courseName',
  chapterName: 'chapterName',
  qPersonName: 'qPersonName'
}

export const personalCenter_info = {
  username: 'username',
  lastLoginTime: 'lastLoginTime',
  id: 'id',
  position: 'position',
  field: 'field',
  mail: 'mail'
}

export const homework_tableField = {
  chapter: 'chapter',
  course: 'course',
  updatedAt: 'updatedAt',
  student: 'student',
  taskStatus: 'taskStatus',
  operation: 'operation',
  courseName: 'courseName'
}
