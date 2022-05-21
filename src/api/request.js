import axios from 'axios';
import {Loading} from 'element-ui';
import { getToken, removeToken } from "../views/SignIn/js/auth";
let loading = null;
import { Message } from 'element-ui';
import router from '../router';
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:5000/api', // api的base_url
  timeout: 5000 // 请求超时设置
})

function startLoading(){
  loading = Loading.service({
    lock:true,
    text:'拼命加载中...',
    background:'rgba(0,0,0,0.7)'
  });
}

function endLoading(){
  loading.close();
}

// 请求拦截
service.interceptors.request.use(config => {
  // 请求前加载动画
  // startLoading();
  if(getToken()){
    //判断当前token是否存在，如果存在就设置请求头header
    config.headers.Authorization = getToken();
  }
  return config;
}, error => {
  return Promise.reject(error);
})

// 响应拦截
service.interceptors.response.use(response => {
  // endLoading();
  return response;
}, error => {
  // endLoading();
  console.log(error);
  
  // alertInfo(error.response.data,'error');
  // 获取错误状态码
  const { status } = error.response;
  if(status === 401){
    Message.error('token已失效，请重新登录')
    removeToken();
    router.push('/login');
  }
  return Promise.reject(error);
})

export default service;

