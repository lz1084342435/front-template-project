<script setup lang="ts">
import { useBasicStore } from '@/stores/basic'
import SvgIcon from '@/icons/SvgIcon.vue'
const { reactiveSettings } = useBasicStore()
defineProps({
  // 是否折叠
  collapse: {
    type: Boolean,
    required: true
  }
})
const state = reactive({
  title: reactiveSettings.title,
  // src/icons/common/sidebar-logo.svg
  logo: 'sidebar-logo'
})
// export to page for use
const { title, logo } = toRefs(state)
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebar-logo-fade">
      <!--  折叠显示   -->
      <router-link v-if="collapse" class="sidebar-logo-link" to="/">
        <svg-icon v-if="logo" :icon-class="logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <!--  正常显示   -->
      <router-link v-else class="sidebar-logo-link" to="/">
        <svg-icon v-if="logo" :icon-class="logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss">
// vue3.0 过度效果更改  enter-> enter-from   leave-> leave-from
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  padding-left: 14px;
  overflow: hidden;
  line-height: 50px;
  text-align: left;
  background: var(--sidebar-logo-background);

  & .sidebar-logo-link {
    width: 100%;
    height: 100%;

    & .sidebar-logo {
      width: var(--sidebar-logo-width);
      height: var(--sidebar-logo-height);
      margin-right: 12px;
      color: var(--sidebar-logo-color);
      vertical-align: middle;
      fill: currentcolor;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      font-family: Avenir, 'Helvetica Neue', 'Aria l', 'Helvetic a', sans-serif;
      font-size: 14px;
      font-weight: 600;
      line-height: 50px;
      color: var(--sidebar-logo-title-color);
      vertical-align: middle;
    }
  }

  &.collapse {
    visibility: visible;

    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
