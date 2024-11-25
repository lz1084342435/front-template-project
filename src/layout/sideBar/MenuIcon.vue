<script setup lang="ts">
// import * as ElSvg from '@element-plus/icons-vue'
defineProps({
  meta: { type: Object, default: null }
})
</script>

<template>
  <!-- 如果有 elSvgIcon 显示 elSvgIcon 没有显示 icon-->
  <el-icon v-if="meta?.elSvgIcon">
    <component :is="meta.elSvgIcon" />
  </el-icon>
  <div v-else-if="meta?.icon" class="menu-svg-class"><svg-icon :icon-class="meta?.icon" /></div>
</template>

<style scoped lang="scss">
.menu-svg-class {
  width: 29px;
  padding-left: 5px;
  margin-left: 1px;
  text-align: left;
  vertical-align: middle;
}
</style>
