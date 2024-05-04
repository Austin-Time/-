//封装banner轮播图相关的代码
import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/apis/home'

export function useBanner () {
  const bannerList = ref([])

  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2'
    })

    bannerList.value = res.result
  }

  onMounted(() => getBanner())

  return {
    bannerList
  }
}

/* 实现步骤：
1，按照业务声明以use打头的逻辑函数
2,把独立的业务逻辑封装到各函数内部
3，函数内部把组件中需要的函数数据或者方法return出去
4，在组件中调用函数把数据或者方法组合回来使用 */
