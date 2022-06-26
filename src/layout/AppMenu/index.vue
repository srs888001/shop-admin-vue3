<template>
  <el-menu
    :unique-opened="true"
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#bcc0c5"
    active-text-color="#2d8cf0"
    :collapse="$store.state.isCollapse"
    router
  >
    <el-menu-item index="/">
      <i class="el-icon-menu" />
      <template #title>
        首页
      </template>
    </el-menu-item>
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location" />
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        <i class="el-icon-menu" />
        <template #title>
          商品列表
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_classify">
        <i class="el-icon-menu" />
        <template #title>
          商品分类
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        <i class="el-icon-menu" />
        <template #title>
          商品规格
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_reply">
        <i class="el-icon-menu" />
        <template #title>
          商品评论
        </template>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu" />
      <template #title>
        导航二
      </template>
    </el-menu-item>
    <el-menu-item
      index="3"
      disabled
    >
      <i class="el-icon-document" />
      <template #title>
        导航三
      </template>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting" />
      <template #title>
        导航四
      </template>
    </el-menu-item>
    <el-submenu index="5">
      <template #title>
        <i class="el-icon-location" />
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template #title>
          分组一
        </template>
        <el-menu-item index="5-1">
          选项1
        </el-menu-item>
        <el-menu-item index="5-2">
          选项2
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="5-3">
          选项3
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
