//axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
/* import {useRouter} from 'vue-router'//后面带r的是调取方法不带r是获取参数 */
import router from '@/router'//vue3不允许在setup之外使用useRouter
import {useUserStore} from '@/stores/userStore'
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
  })
 // axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1. 从pinia获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`//
  }
  return config
}, e => Promise.reject(e))
  
  // axios响应式拦截器
  httpInstance.interceptors.response.use(res => res.data, e => {
    const userStore = useUserStore()
    //统一错误提示
    ElMessage({
      type:'warning',
      message:e.response.data.message
    })
    //401token失效处理
    //2，跳转到登录页
    if(e.response.status===401){
      userStore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(e)
  })
  
  export default httpInstance