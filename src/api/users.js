import request from "./request";

// 注册
export function register(data) {
  return request({ 
    url: '/admin/register',
    method: 'post',
    data
  })
}

// 登录
export function signin(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 核对验证码
export function getCode(account) {
  return request({
    url: '/admin/getCode',
    method: 'get',
    params: {
      account
    }
  })
}

// 核对验证码
export function checkCode(data) {
  return request({
    url: '/admin/checkCode',
    method: 'post',
    data
  })
}


// 找回密码
export function forget(account) {
  return request({
    url: '/admin/signin?account=' + account,
    method: 'get'
  })
}
