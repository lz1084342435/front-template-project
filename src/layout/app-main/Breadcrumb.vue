<script setup lang="ts">
import { compile } from 'path-to-regexp'
import type { RouterTypes, RouteRawConfig } from '#/basic'
import { useBasicStore } from '@/stores/basic'
const levelList = ref()
const { reactiveSettings } = useBasicStore()
const route = useRoute()
const getBreadcrumb = () => {
  // only show routes with has  meta.title
  let matched: RouterTypes = route.matched.filter((item) => item.meta?.title)

  const isHasDashboard = matched[0]?.name?.toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
  if (!isHasDashboard) {
    matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched)
  }
  // 过滤面包屑显示的数组
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

// 页面跳转处理
// compile函数将返回一个用于将参数转换为有效路径的函数：
// const  toPath =  compile ( "/user/:id" ,  {  encode : encodeURIComponent  } ) ;
// toPath ( {  id : 123  } ) ; //=> "/user/123"
const pathCompile = (path: string) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}
const router = useRouter()
// 如果有redirect地址直接跳转，没有跳转path
const handleLink = (item: RouteRawConfig) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  if (path) {
    router.push(pathCompile(path))
  }
}
// 是否可点击链接
const showLink = (item: RouteRawConfig, index: number) => {
  return item.redirect === 'noRedirect' || index === unref(levelList).length - 1
}
// 监听路由路径刷新 面包屑显示数组
watch(
  () => route.path,
  () => getBreadcrumb(),
  { immediate: true }
)
</script>

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!--  mainNeedAnimation：控制该面包屑是否需要动画  -->
    <transition-group v-if="reactiveSettings.mainNeedAnimation" name="breadcrumb">
      <!--  根据过滤后的数组生成面包屑  -->
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="showLink(item, index)" class="no-redirect">
          {{ item.meta?.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
    <!--no transition-->
    <template v-else>
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="showLink(item, index)" class="no-redirect">
          {{ item.meta?.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  margin-left: 8px;
  font-size: 14px;
  line-height: 50px;

  .no-redirect {
    color: var(--breadcrumb-no-redirect);
    cursor: text;
  }
}
</style>
