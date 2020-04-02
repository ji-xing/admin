import axios from "axios";
import { Message } from 'element-ui';
import  appCook from "../untils/app.js"
// 创建axios，赋给变量service
/**
 * process.env.NODE_ENV
 *要在webpack中配置mode为delelopment or production
 */
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

var service = axios.create({
  baseURL: BASEURL,  // http://192.168.0.106:8080/devApi/
  timeout: 15000,   // 超时
  // 网络请求接口，假设 5000

});
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  ;
  config.headers['Tokey'] = appCook.getCookname("token");
  config.headers['UserName'] = appCook.getCookname("username");
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (data) {
  // 对响应数据做点什么
  if(data.data.resCode !== 0) {
    // Message.error(data.message);
    Message({
      message: data.message,
      type: 'error'
    });
    return Promise.reject(data);
  }else{
    return data;
    // return Promise.resolve(data);
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default service; //记得要导出来
