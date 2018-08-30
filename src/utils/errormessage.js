const errorMessage = {
  zh: {
    // 通用错误
    0: '抱歉，出了点问题，请重试',
    1: '该字段重复',
    2: '该数据不存在',
    3: '参数不能为空',
    4: '该数据已存在',
    5: '请重新登录',
    6: '您的登录邮箱或密码输入有误，请重试',
    7: '该用户不存在',
    8: '验证码输入有误，请重试',
    9: '你已经重置过默认密码',
    10: '请登录',
    11: '旧密码输入错误',
    12: '您的新密码必须与前六次密码不同',
    13: '验证码已过期',
    14: '密码九十天未修改，请重置密码',
    15: '邮箱已存在，请使用其他邮箱',
    16: '邮箱格式错误',
    17: '该账户已经被暂停,请联系youplus',
    18: '手机号已经被使用，请使用其他手机号注册',
    19: '你的手机号不存在，请注册后再登陆',
    20: '你的手机号活密码输入错误，请重试',
    21: '你的密码输入有误，请重试',
    22: '微信授权失败，请重试',
    23: '该微信或者手机号已注册，请直接登录',
    24: '该微信未注册，请注册后再登录',
    25: '请绑定手机号或者邮箱后再登陆',
    27: '该微信已经被绑定，请使用其他微信',
    28: '操作过于频繁，请稍后再试',

    // 课程视频相关
    51: '请购买后再观看该视频',
    52: '你已经创建完该课程权限',
    53: '课程权限类型不存在',
    54: '移除班级课程之后再移除公司相关课程',
    55: '该课程权限已经被使用，不能删除',
    56: '该课程已经被下架',
    57: '你没有该课程的权限',
    58: '面授和直播课程必须填写库存数量',

    // 章节相关
    101: '该章节不存在',
    102: '章节名称存在或序号重复',
    103: '章节老师有视频正在使用，请移除视频相关老师之后再更新章节相关老师',

    // 公司课程权限
    151: '你选中的课程权限公司已经拥有',
    152: '你选中的课程权限公司该公司没有',
    153: '移除公司相关数据之后再移除该公司',
    154: '课程老师有章节正在使用，请移除章节相关老师之后再更新课程相关老师',

    // 班级公司学员相关
    201: '移除班级相关学员和课程之后再移除班级',
    202: '你选中的课程权限班级已经拥有',
    203: '改班级没有此课程权限，不能移除',
    204: '选中的学员不在该公司',
    205: '该学员已经在该班级',
    206: '导入学员信息有误，请检查信息后再导入',
    207: '学员数量大于公司最大人数',
    208: '从班级移除之后再从公司移除',
    209: '学员从相关班级和公司移除之后才能删除学员',
    210: '学员只能在一个公司中',

    // 提问回复相关
    251: '购买课程后才能提问',
    252: '一个提问只能回复一次',

    // 学生作业相关
    301: '等待老师批改之后再上传新的作业',

    // 学生讨论相关
    351: '只能删除自己的评论',

    401: '不能重复评论',

    // 作业评论相关
    451: '学生作业只能评论一次',

    501: '请从课程中移除该老师后再删除老师',

    551: '该订单状态不能更新',

    601: '该发票状态不能更新',

    651: '请删除关联产品之后再删除优惠券',
    652: '该产品已经拥有该折扣',
    653: '该课程权限已经创建产品',

    701: '该邮箱已经被使用，请使用其他邮箱',

    751: '该产品有未处理订单，不能删除',

    // 发票相关
    801: '只能添加一个公司发票',
    802: '该订单不能开具发票',
    803: '该订单已支付成功, 不能修改发票',

    // 收藏产品相关
    851: '你已经收藏该产品'
  },
  en: {
    // 通用错误
    0: 'Sorry, something went wrong, please try again',
    1: 'This field is repeated',
    2: 'The data does not exist',
    3: 'Parameter cannot be empty',
    4: 'This data already exists',
    5: 'please login again',
    6: 'Your login email or password was entered incorrectly. Please try again',
    7: 'this user does not exist',
    8: 'Verification code input is incorrect, please try again',
    9: 'You have reset the default password',
    10: 'please sign in',
    11: 'Old password input error',
    12: 'Your new password must be different from the first six passwords',
    13: 'Verification code has expired',
    14: 'Password has not been modified for 90 days, please reset password',
    15: 'The mailbox already exists, please use another mailbox',
    16: 'Incorrect mailbox format',
    17: 'The account has been suspended, please contact youplus',
    18: 'The mobile number has been used, please use another mobile number to register',
    19: 'Your mobile phone number does not exist. Please register and log in again.',
    20: 'Your phone number or password was entered incorrectly, please try again',
    21: 'Your password was entered incorrectly, please try again',
    22: 'WeChat authorization failed, please try again',
    23: 'The WeChat or mobile phone number is already registered, please log in directly',
    24: 'The WeChat is not registered, please log in and log in again.',
    25: 'Please bind your mobile phone number or email address before logging in.',
    27: 'The WeChat has been bound, please use other WeChat',
    28: 'The operation is too frequent, please try again later',

    // 课程视频相关
    51: 'Please purchase and watch this video.',
    52: 'You have created the course permissions',
    53: 'Course permission type does not exist',
    54: 'Remove the company-related course after removing the class',
    55: 'This course permission has been used and cannot be deleted',
    56: 'The course has been removed',
    57: 'You do not have permission for the course',
    58: 'The number of stocks must be filled in for face-to-face and live courses',

    // 章节相关
    101: 'This section does not exist',
    102: 'Chapter name exists or the serial number is repeated',
    103: 'The chapter teacher has a video in use, please remove the video related teacher and then update the chapter related teacher',

    // 公司课程权限
    151: 'The course permission company you selected already has',
    152: 'The course permission company you selected does not have the company',
    153: 'Remove company-related data before removing the company',
    154: 'The course teacher has chapters in use, please remove the chapter related teachers and then update the course related teachers.',

    // 班级公司学员相关
    201: 'Remove classes after removing class-related students and courses',
    202: 'The course permission class you selected already has',
    203: 'The class does not have this course permission and cannot be removed.',
    204: 'The selected student is not in the company',
    205: 'The student is already in the class',
    206: 'Import student information is incorrect, please check the information before importing',
    207: 'The number of students is greater than the maximum number of companies',
    208: 'Remove from the class after removing it from the class',
    209: 'Students can only be deleted after the class has been removed from the relevant class and company.',
    210: 'Students can only be in one company',

    // 提问回复相关
    251: 'Ask questions after purchasing a course',
    252: 'A question can only be replied once',

    // 学生作业相关
    301: 'Wait for the teacher to correct and upload a new assignment',

    // 学生讨论相关
    351: 'Can only delete your own comments',

    401: "Can't repeat comments",

    // 作业评论相关
    451: 'Student homework can only be commented once',

    501: 'Please remove the teacher from the course before deleting the teacher',

    551: 'The order status cannot be updated',

    601: 'The invoice status cannot be updated',

    651: 'Please delete the associated product before deleting the coupon',
    652: 'This product already has the discount',
    653: 'The course permission has been created',

    701: 'The mailbox has been used, please use another mailbox',

    751: 'This product has an unprocessed order and cannot be deleted.',

    // 发票相关
    801: 'Can only add one company invoice',
    802: 'The order cannot be invoiced',
    803: 'The order has been paid successfully and the invoice cannot be modified.',

    // 收藏产品相关
    851: 'You have already collected this product'
  }
}
export default errorMessage
