import Immutable from 'immutable'
import React from 'react'
import { picurl, paymentFields as _pay, settingFields, currency } from '../config'
import { Row, Col, Tooltip, Icon } from 'antd'
import { Link } from 'react-router'

// num toFixed
export const toFixed = (num, fractionDigits = 2) =>
  (Math.round(num * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits)).toFixed(fractionDigits)

//去掉怪异的小数
export const fixedNumber=(num,fractionDigits=2)=>(Math.round(num * Math.pow( 10, fractionDigits  ))/Math.pow(10,fractionDigits));

// 货币格式化
export const numberWithCommas = x => {
  x = x === undefined ? 0 : x
  var parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

// 如果是小数则 fixed
export const autoFixed=(num,fractionDigits)=>{
  let value=fixedNumber(num)
  if(parseInt(value)==value){
    return value;
  }else{
    return toFixed(value,fractionDigits)
  }
}



//用户格式化输出数据
export const format={
  money:m=>numberWithCommas(toFixed(m/100)),
  percent:value=>isNaN(value)?'0%':autoFixed(value*100)+'%'
}


exports.getToolTip = (text, showChar = 20) => {
  if (!text) return
  function sub (t, n) {
    let r = /[^\x00-\xff]/g
    if (t.replace(r, 'mm').length <= n) return t
    let m = Math.floor(n / 2)
    for (let i = m; i < t.length; i++) {
      if (t.substr(0, i).replace(r, 'mm').length >= n) {
        return (
          <span>
            {t.substr(0, i) + ' ... '}
            <Icon type='question-circle-o' />
          </span>
        )
      }
    }
    return t
  }

  return (
    <span>
      <div style={{ display: 'inline-block', marginRight: '15px' }}>
        <Tooltip title={<span>{text}</span>}>{sub(text, showChar)}</Tooltip>
      </div>
    </span>
  )
}

//返回数字 *100
exports.mul100 = (v)=>{
  let _v = parseFloat(v?v:0)
  return mul(_v,100)
}


export function deepCopy(p, c){
  var c = c || {};
  for (var i in p) {
    if (p[i]&&typeof p[i] === 'object') {
      // console.log('----',p[i])
      c[i] = (p[i].constructor === Array) ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}
//返回数字 /100
exports.div100 = (v)=>{
  let _v = parseFloat(v?v:0)
  return div(_v,100)
}

//输入框格式化货币输入
exports.formatM=(value)=>{
  let parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if(parts[1]){
    parts[1] = parts[1].substring(0,2)
  }
  return ` ${parts.join(".")}`;
}

// 格式化 货币的显示方式
exports.formatMoney = (m, d) => numberWithCommas(toFixed(m, d))

exports.formatMoneyToNum = m => m.replace(',', '').replace(/,/g, '')

// 格式化数据库时间
exports.formatDate = e => e.replace(/(\d{4}-\d{2}-\d{2}).*/, '$1')
exports.formatDateToM = e => e && e.substring(0, 10)

exports.getScrollTop = () => {
  var scrollPos
  if (window.pageYOffset) {
    scrollPos = window.pageYOffset
  } else if (document.compatMode && document.compatMode !== 'BackCompat') {
    scrollPos = document.documentElement.scrollTop
  } else if (document.body) {
    scrollPos = document.body.scrollTop
  }
  return scrollPos
}

exports.configDirectory = (text, config, cate) => {
    for (let v in config) {
      if (text == v) {
        return config[v]
      }
    }

}

exports.configCate = (text, config) => {
  if (!isNaN(text)) {
    for (let v in config) {
      if (text == v) {
        return config[v]['name_en']
      }
    }
  } else {
    if (text instanceof Array) {
      let _result = []
      text.map(v => {
        for (let a in config) {
          if (v == config[a]['name_en']) {
            _result.push(a)
          }
        }
      })
      return _result.join(',')
    } else {
      for (let z in config) {
        if (text == config[z]['name_en']) {
          return z
        }
      }
    }
  }
}
exports.configDirectoryObject = (text, config) => {
  for (let v in config) {
    if (text === config[v]) {
      return v
    }
  }
}

exports.renderPic = v => {
  if (typeof v === 'string') {
    return (
      <Row style={{ marginTop: '15px', display: 'inline-block' }}>
        <img src={picurl + v} alt='' style={{ height: '150px', width: '150px', display: 'inline-block' }} />
      </Row>
    )
  } else {
    let _pic = v.toJS()
    let _picArr = []
    if (_pic instanceof Array) {
      _pic.map(v => {
        _picArr.push(v.picture)
      })
      return (
        <Row style={{ marginTop: '15px', display: 'inline-block' }}>
          {_picArr.map(v => (
            <img
              src={picurl + v}
              alt=''
              style={{ height: '150px', width: '150px', display: 'inline-block', marginRight: '15px' }}
            />
          ))}
        </Row>
      )
    }
  }
}

exports.renderPicAndTitle = (v, id) => {
  let _pic = v.toJS()
  let _picArr = []
  return (
    <Row style={{ marginTop: '15px' }}>
      {_pic.map(v => (
        <Col span='4' style={{ marginBottom: '15px' }}>
          {v.product_slide_pics.map(z => (
            <img src={z.picture} alt='' style={{ height: '150px', width: '150', display: 'inline-block' }} />
          ))}
          <p style={{ textAlign: 'center', width: '150' }}>{v.name}</p>
        </Col>
      ))}
      <Col span='4' style={{ lineHeight: '150px' }}>
        <Link to={{ pathname: '/product_management', query: { craftsmanUsername: id } }}>More...</Link>
      </Col>
    </Row>
  )
}

exports.formatAddress = v => {
  // console.log(v.toJS())
  let _arr = []
  let _par = v.toJS()

  if (_par instanceof Array) {
    _par.map(t => {
      // console.log('t',t)
      if (t.detail) {
        _arr.push(t.province + ',' + t.city + ',' + t.region + ',' + t.detail)
      } else {
        _arr.push(t.province + ',' + t.city + ',' + t.region)
      }
    })
  } else {
    let arr = []
    for (let o in _par) {
      arr.push(_par[o])
    }
    arr = arr.join(',')
    _arr.push(arr)
  }

  // console.log('address',_arr)
  return _arr
}

// 将分散在details 数据抽出和并成一条数据
export function splitDataFromField (field) {
  return function (data = Immutable.List()) {
    let $formatVendor = Immutable.List()
    data.forEach($v => {
      const $base = $v.delete(field)
      const $details = $v.get(field)
      if ($details.size > 0) {
        const $list = $details.map(($detail, i) => $detail.merge($base))
        $formatVendor = $formatVendor.concat($list)
      } else {
        $formatVendor = $formatVendor.concat([$base])
      }
    })
    return $formatVendor
  }
}
export const formatDetails = (field = 'details') => splitDataFromField(field)

export function add (a, b) {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) + mul(b, e)) / e
}
export function sub (a, b) {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }

  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) - mul(b, e)) / e
}
export function mul (a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
}

export function div (a, b) {
  var c,
    d,
    e = 0,
    f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  return (
    (c = Number(a.toString().replace('.', ''))),
    (d = Number(b.toString().replace('.', ''))),
    mul(c / d, Math.pow(10, f - e))
  )
}

exports.divHundred = v => {
  return div(v, 100)
}

exports.cloneObj = obj => {
  var newObj = {}
  if (obj instanceof Array) {
    newObj = []
  }
  for (var key in obj) {
    var val = obj[key]
    // newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
    newObj[key] = typeof val === 'object' ? this.cloneObj(val) : val
  }
  return newObj
}
