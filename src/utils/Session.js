import http from './Server';
const LOGIN_COOKIE_NAME = 'T&R_auth_token';

export function _getCookie (name) {
  let start, end
  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      end = document.cookie.indexOf(';', start)
      if (end === -1) {
        end = document.cookie.length
      }
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}

export function _setCookie (name, value, expire) {
  let date = new Date()
  date.setDate(date.getDate() + expire)
  document.cookie =  name + '=' + encodeURIComponent(value) + '; path=/' +
    (expire ? ';expires=' + date.toGMTString() : '')
}
export function isAuthenticated () {
  return _getCookie(LOGIN_COOKIE_NAME)
}

export function authenticateSuccess (token) {
  _setCookie(LOGIN_COOKIE_NAME, token)
}
export function getParam (name) {
  //构造一个含有目标参数的正则表达式对象
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  //匹配目标参数
  var r = window.location.search.substr(1).match(reg);
  //返回参数值
  if (r !== null){
    return unescape(r[2]);
  }
  //不存在时返回null
  return null;
}
export function logout () {
  _setCookie(LOGIN_COOKIE_NAME, '', 0)
}
export function get_NewToken () {
  http.get('/api/method/iot_ui.iot_api.get_token?' + Date.parse(new Date())).then(res=>{
      _setCookie('T&R_auth_token', res.message)
  })
}
export function apply_AccessKey (){
  http.get('/api/method/iot_ui.iot_api.apply_AccessKey').then(res=>{
    console.log('AccessKey', res)
  })
}
export function isAdmin (){
  http.get('/api/method/iot_ui.iot_api.company_admin').then(res=>{
    _setCookie('T&R_isAdmin', res.message.admin)
    if (res.message.admin === true){
        _setCookie('T&R_companies', res.message.companies[0]);
    } else {
        _setCookie('T&R_companies', '');
    }
  })
}