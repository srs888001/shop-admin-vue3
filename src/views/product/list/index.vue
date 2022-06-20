<template>
  <h1>首页123</h1>
  <h2>首页123 h2</h2>
</template>

<script lang="ts" setup>
import { getLoginInfo } from '@/api/common'
import { onMounted, ref } from 'vue'
import type { ILoginInfo } from '@/api/types/common'

const list = ref<ILoginInfo['slide']>([])

onMounted(() => {
  getLoginInfo().then(data => { // 这里的 data 就有类型了
    list.value = data.slide
    console.log(data)
  })
})
</script>

<style lang="scss" scoped>
</style>
