<script setup lang="ts">
import Sidebar from './sideBar/index.vue'
import AppMain from './app-main/index.vue'
import Navbar from './app-main/Navbar.vue'
import TagsView from './app-main/TagsView.vue'
import { useBasicStore } from '@/stores/basic'
const { sidebar, reactiveSettings } = useBasicStore()
const classObj = computed(() => {
  return {
    'close-sidebar': !sidebar.opened,
    'hide-sidebar': !reactiveSettings.showLeftMenu
  }
})
</script>

<template>
  <div :class="classObj" class="layout-wrapper">
    <!--left side-->
    <Sidebar v-if="reactiveSettings.showLeftMenu" class="sidebar-container" />
    <!--right container-->
    <div class="main-container">
      <Navbar v-if="reactiveSettings.showTopNavbar" />
      <TagsView v-if="reactiveSettings.showTagsView" />
      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  position: relative;
  min-height: 100%;
  margin-left: var(--side-bar-width);
  transition: margin-left var(--sideBar-switch-duration);
}

.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--side-bar-width) !important;
  height: 100%;
  overflow: hidden;
  font-size: 0;
  background-color: var(--el-menu-bg-color);
  border-right: 0.5px solid var(--side-bar-border-right-color);
  transition: width var(--sideBar-switch-duration);
}

.close-sidebar {
  .sidebar-container {
    width: 54px !important;
  }

  .main-container {
    margin-left: 54px !important;
  }
}

.hide-sidebar {
  .sidebar-container {
    width: 0 !important;
  }

  .main-container {
    margin-left: 0;
  }
}
</style>
