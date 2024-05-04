//封装与用户相关的接口函数
import request from '@/utils/http'
export const loginAPI=({account,password})=>{//通过解构赋值方式将接口数据传过来
    return request({
        url:'/login',
        method:'POST',
        data:{
            account,
            password
        }
    })
}

//会员中心接口封装
export const getLikeListAPI = ({ limit = 4 }) => {
    return request({
      url:'/goods/relevant',
      params: {
        limit 
      }
    })
  }