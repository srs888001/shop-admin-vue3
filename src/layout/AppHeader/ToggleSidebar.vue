<template>
  <el-icon @click="handleCollapse">
    <Expand v-if="collapseIcon" />
    <Fold v-else />
  </el-icon>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()

const collapseIcon = computed(() => {
  return store.state.isCollapse
})

const handleCollapse = () => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}
</script>

<style lang="scss" scoped></style>
