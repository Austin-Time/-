//引入初始化的样式文件
import '@/styles/common.scss'



import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
// 引入懒加载插件
import { lazyPlugin } from '@/directives'
// 引入全局组件插件
import { componentPlugin } from '@/components'

const app = createApp(App)
const pinia=createPinia()
//注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.mount('#app')




app.use(componentPlugin)


/* //测试接口函数
import {getCategory} from '@/apis/testAPI'
getCategory().then(res=>{
    console.log(res);
}) */




