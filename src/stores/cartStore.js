// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {useUserStore} from './userStore'
import {insertCartAPI,findNewCartListAPI,delCartAPI} from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 1. 定义state - cartList
  const cartList = ref([])//在数组中寻找用find方法

   //获取最新购物车列表
   const updateNewList=async()=>{
    const res=await findNewCartListAPI()
    cartList.value=res.result
  }
  // 2. 定义action - addCart
  const addCart =async (goods) => {
    const { skuId, count } = goods
    if(isLogin.value){
      //登录之后的加入购物车逻辑,以便登陆后能够合并用户未登录时选中的商品
      await insertCartAPI({ skuId, count })
      updateNewList()
    }else{
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      // 找到了
      item.count++
    } else {
      // 没找到
      cartList.value.push(goods)
    }
  }
    }
    

   // 删除购物车
   const delCart = async (skuId) => {
    if(isLogin.value){
    await  delCartAPI([skuId])
    updateNewList()
    }else{
    // 思路：
    // 1. 找到要删除项的下标值 - splice
    // 2. 使用数组的过滤方法 - filter
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)//根据id得到下标, 默认去遍历list集合，将集合中的每个元素传入到function的item里
    cartList.value.splice(idx, 1)
    }

  
   }
    //清除购物车
    const clearCart = () => {
      cartList.value = []
    
}

// 单选功能
//核心思路：始终把单选框的状态和pinia中的store对应的状态进行绑定
//v-model双向绑定不方便进行命令式的操作(因为后面还要调接口),所以把v-model回退到一般模式,也就是:model-value和@change的配合实现
const singleCheck = (skuId, selected) => {
  // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
  const item = cartList.value.find((item) => item.skuId === skuId)
  item.selected = selected
}

// 全选功能action
//核心思路:
//1,操作单选决定全选:只有当cartList中的所有项都为true时，全选状态才为true
//2，操作全选决定单选cartList中的所有项的selected都要跟着一起变
const allCheck = (selected) => {
  // 把cartList中的每一项的selected都设置为当前的全选框状态
  cartList.value.forEach(item => item.selected = selected)
}

//计算属性
//1，总的数量 所有项的count之和
const allCount= computed(()=>cartList.value.reduce((a, c) => a + c.count, 0))//a是上一次的结果，c是当前的元素，默认a为0每次计算后将值赋值给a
//2，总价 所有项的count*price之和
const allPrice= computed(()=>cartList.value.reduce((a, c) => a + c.count * c.price, 0))
// 是否全选计算属性
const isAll = computed(() => cartList.value.every((item) => item.selected))

// 3. 已选择数量
const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
//前面返回的依旧是个数组所以可以再次调用reduce方法
// 4. 已选择商品价钱合计
const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))


  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    addCart, 
    delCart,
    singleCheck,
    allCheck,
    clearCart,
    updateNewList
  }
}, {
  persist: true,
})