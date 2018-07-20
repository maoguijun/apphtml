import { easyfetch } from './FetchHelper'
import { picurl, host, AESKey } from '../config'
import Immutable from 'immutable'
import moment from 'moment'
import CryptoJS from 'crypto-js'

// 加密aes

exports.encryptAes = data => {
  let iv = CryptoJS.enc.Utf8.parse(AESKey)

  let enc = CryptoJS.AES.encrypt(data, iv, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  return enc.toString()
}

// sha256 加密

exports.encryptSha256 = data => {
  let enc = CryptoJS.SHA256(data).toString()

  return enc
}

export const formatSecondToMinute = value => {
  if (!value) {
    return '00:00'
  }
  let arr = [parseInt(value / 60), parseInt(value % 60)]
  if (arr.every(i => !i)) {
    return '00:00'
  }
  arr = arr.map(i => {
    // if (i < 10) {
    //   i = `0${i}`
    // }
    // return `${i}`
    return toFixed(i, 2)
  })
  return arr.join(':')
}
/**
 * 将数字格式化成固定的位数
 * num:原数字,int
 * d:需要固定的位数，int
 */

export const toFixed = (num, d) => {
  if (num === undefined || d === undefined || !/^\d$/.test(num + '') || !/^\d$/.test(d + '')) {
    return num
  }
  let arr = (num + '').split('')
  let count = d - arr.length
  if (count < 0) {
    count = 0
  }
  // count === 0 就直接跳出来，不要做循环
  if (count === 0) {
    return arr.join('')
  }
  for (let i = 0; i < count; i++) {
    arr.unshift('0')
  }
  return arr.join('')
}
