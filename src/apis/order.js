/*
params: {
	orderState:0,对应tab切换的参数
  page:1,页数
  pageSize:2 每页的条数
}
*/
import request from '@/utils/http'

export const getUserOrder = (params) => {
    return request({
      url:'/member/order',
      method:'GET',
      params
    })
  }