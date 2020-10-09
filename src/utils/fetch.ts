/*
 * @Description: 
 * @Version: 0.1
 * @Autor: Lowt
 * @Date: 2020-09-29 11:10:37
 * @LastEditors: Lowt
 * @LastEditTime: 2020-10-09 13:57:02
 */
import axios from 'axios'
import { notification } from 'antd';
import baseConfig from '../config/baseConfig';

const fetch = axios.create({
  withCredentials: true
})

fetch.interceptors.request.use((value) => {



  value = {
    ...value,
    baseURL: baseConfig.baseUrl,
    headers: {
      ...value.headers,
      // Authorization: baseConfig.authorizationInfo || 'eyJhbGciOiJIUzI1NiJ9.eyJyZWFsTmFtZSI6IkFkbWluIiwiYmVsb25nVG9JZHMiOiI3OCIsImRlcHRJZCI6MTMwLCJ0ZW5hbnRJZCI6bnVsbCwiZGVwdFBhdGgiOiIxMDQvMTI5LzEzMCIsImlkIjoiMSIsImV4cCI6MjI2NzIyMDQ2MX0.-G3ZsnqjPyOFQRZyBglKgrRH5HgkXExaCphRxBZdhuM'
    }
  }
  return value
}, error => {
  return Promise.reject(error)
})

fetch.interceptors.response.use(res => {
  if (res.status === 200) {
    if (res.data.code === 200) {
      return Promise.resolve(res)
    } else {
      if (res.data.code === 100) {
        notification.error({
          message: 'token错误',
          description: '请重新登录'
        })
        window.location.href = (window as any).LOGOUT_URL
      } else {
        notification.error({
          message: '错误',
          description: res.data.message
        })
      }
    }

  }
  return Promise.reject(res)
}, error => {
  console.log(error)
  if (error.response.status === 500) {
    notification.error({
      message: '系统错误',
      description: error.response.data.message
    })
    return Promise.reject(error)
  }
  return Promise.reject(error)
})

export default fetch
