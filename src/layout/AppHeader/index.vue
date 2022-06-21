<template>
  <el-space size="large">
    <ToggleSidebar />
    <Breadcrumb />
  </el-space>
  <el-space size="large">
    <MenuSearch />
    <FullScreen />
    <Notification />
    <UserInfo />
  </el-space>
</template>

<script lang="ts" setup>
import ToggleSidebar from './toggleSidebar.vue'
import Breadcrumb from './breadCrumb.vue'
import MenuSearch from './menuSearch.vue'
import FullScreen from './fullScreen.vue'
import Notification from './notificationI.vue'
import UserInfo from './userInfo.vue'

</script>

<style lang="scss" scoped>
i {
  font-size: 19px;
  cursor: pointer;
}
</style>
