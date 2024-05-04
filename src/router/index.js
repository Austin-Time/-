//createRouter：创建router实例
//createWebHistory:创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component对应关系的位置
  routes: [
    {
   path:'/',
   component:Layout,
   children:[
    {
      path:'',//默认页面，制空当访问/路径下的页面时也会同时渲染该页面
      component:Home
    },
    {
      path:'category/:id',
      component:Category
    },
    {
      path: 'category/sub/:id',
      name: 'subCategory',
      component: SubCategory
    },
      {
        path: 'detail/:id',
        component: Detail
      },
      {
        path: 'cartList',
        component: CartList
      },
      {
        path: 'checkout',
        component: Checkout
      },
      {
        path: 'pay',
        component: Pay
      },
      {
        path: 'paycallback', // 注意路径，必须是paycallback
        component: PayBack
      },
      {
        path: 'member',
        component: Member,
        children: [
          {
            path: '',//当显示二级路由将三级路由作为默认路由时，需要制空该路由
            component: UserInfo
          },
          {
            path: 'order',
            component: UserOrder
          }
        ]
      }
   ]
    },
    {
      path:'/login',
      component:Login
       }
  ],
  //路由滚动行为定制
  scrollBehavior(){
    return {
      top:0
    }
  }
})

export default router
