<script setup lang="ts">
import { CaretBottom } from '@element-plus/icons-vue'
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from './Hamburger.vue'
import ScreenFull from './component/ScreenFull.vue'
import ThemeSelect from './component/ThemeSelect.vue'
import ScreenLock from './component/ScreenLock.vue'
import { useBasicStore } from '@/stores/basic'

const basicStore = useBasicStore()
const { reactiveSettings, sidebar, setToggleSideBar, resetState } = basicStore
const toggleSideBar = () => {
  setToggleSideBar()
}
// 退出登录
// const router = useRouter()
// const route = useRoute()
const loginOut = () => {
  console.log('退出登录成功')
  // router.push(`/login?redirect=${route.path}`)
  // 清除store
  resetState()
}
</script>

<template>
  <div class="navbar rowBC reset-el-dropdown">
    <div class="rowSC">
      <!--  切换sidebar按钮  -->
      <hamburger
        v-if="reactiveSettings.showHamburger"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
      <!--  面包屑导航  -->
      <breadcrumb class="breadcrumb-container" />
    </div>
    <!--导航标题-->
    <div v-if="reactiveSettings.showNavbarTitle" class="heard-center-title">
      {{ reactiveSettings.title }}
    </div>
    <!-- 下拉操作菜单 -->
    <div v-if="reactiveSettings.ShowDropDown" class="right-menu rowSC">
      <ScreenFull />
      <ScreenLock />
      <ThemeSelect />
      <el-dropdown trigger="click" size="medium">
        <div class="avatar-wrapper flex items-end">
          <img src="https://github.jzfai.top/file/images/nav-right-logo.gif" class="user-avatar" />
          <CaretBottom style="width: 1em; height: 1em; margin-left: 4px" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <!--<el-dropdown-item>修改密码</el-dropdown-item>-->
            <el-dropdown-item divided @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: relative;
  z-index: 0;
  height: var(--nav-bar-height);
  overflow: hidden;
  background: var(--nav-bar-background);
  box-shadow: var(--nav-bar-box-shadow);
}

// logo
.avatar-wrapper {
  position: relative;
  margin-top: 5px;
  cursor: pointer;

  .user-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 10px;
  }

  .el-icon-caret-bottom {
    position: absolute;
    top: 25px;
    right: -20px;
    font-size: 12px;
    cursor: pointer;
  }
}

// center-title
.heard-center-title {
  position: absolute;
  top: 50%;
  left: 46%;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  transform: translate(-50%, -50%);
}

// drop-down
.right-menu {
  margin-right: 40px;
  cursor: pointer;
  background-color: var(--nav-bar-right-menu-background);

  ::v-deep .svg-icon {
    margin-right: 5px;
    color: var(--nav-bar-svg-icon-color);
  }
}
</style>
