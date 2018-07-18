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
