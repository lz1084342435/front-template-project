<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'
import { resolve } from 'path-browserify'
import { useBasicStore } from '@/stores/basic'
import { useTagsViewStore } from '@/stores/tags-view'
import type { MyRoute } from '#/basic'
import type { RouteMeta, RouteRecordName, RouteRecordRaw } from 'vue-router'
const route = useRoute()
const router = useRouter()
const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {} as MyRoute,
  affixTags: [] as Array<{
    fullPath: string
    path: string
    name?: RouteRecordName
    meta: RouteMeta
  }>
})

const { visitedViews } = storeToRefs(useTagsViewStore())

watch(
  () => route.path,
  () => {
    addTags()
  }
)

watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)
onMounted(() => {
  initTags()
  addTags()
})

// 判断当前点击的item项，是不是当前显示的路由项，如果是则高亮
const isActive = (param: { path: string }) => {
  return route.path === param.path
}
// 当路由设置meta.affix=true,关闭按钮消失
const isAffix = (tag: MyRoute) => {
  return tag.meta && tag.meta.affix
}

const filterAffixTags = (
  routes: Array<RouteRecordRaw>,
  basePath: string = '/'
): Array<{ fullPath: string; path: string; meta: RouteMeta }> => {
  let tags: Array<{ fullPath: string; path: string; meta: RouteMeta }> = []

  routes.forEach((elRoute) => {
    if (elRoute.meta && elRoute.meta.affix) {
      const tagPath = resolve(basePath, elRoute.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        meta: { ...elRoute.meta }
      })
    }
    if (elRoute.children) {
      const tempTags = filterAffixTags(elRoute.children as RouteRecordRaw[], elRoute.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

const tagsViewStore = useTagsViewStore()
const { allRoutes } = useBasicStore()
const initTags = () => {
  // 过滤 affix=true 的 tags 数组并赋值给 state.affixTags，挂载到页面上
  const affixTags = (state.affixTags = filterAffixTags(allRoutes))

  for (const tag of affixTags) {
    // 使用当前路由创建的 tag
    const routeTag = router.resolve({
      path: tag.path
    })
    tagsViewStore.addVisitedView(routeTag) // 使用完整的路由对象
  }
}
const addTags = () => {
  if (route?.name) {
    tagsViewStore.addVisitedView(route)
  }
  return false
}

/* 右键菜单部分 */
const vm = getCurrentInstance()?.proxy
// 右键打开菜单
const openMenu = (tag: MyRoute, e: MouseEvent): void => {
  const menuMinWidth = 105
  const offsetLeft = vm?.$el.getBoundingClientRect().left // container margin left
  const offsetWidth = vm?.$el.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = e.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft) {
    state.left = maxLeft
  } else {
    state.left = left
  }
  state.top = 16
  state.visible = true
  state.selectedTag = tag
}

const basicStore = useBasicStore()

// 关闭当前标签
const closeSelectedTag = (view: MyRoute): void => {
  tagsViewStore.delVisitedView(view).then((elVisitedViews: MyRoute[]) => {
    if (isActive(view)) {
      toLastView(elVisitedViews, view)
    }
    // remove keep-alive by the closeTabRmCache
    if (view.meta?.closeTabRmCache) {
      const routerLevel = view.matched.length
      if (routerLevel === 2) {
        basicStore.delCachedView(view.name as string)
      }
      // if (routerLevel === 3) {
      //   basicStore.delCacheViewDeep(view.name)
      // }
    }
  })
}

// 刷新标签
const refreshSelectedTag = (view: MyRoute): void => {
  const { fullPath } = view
  nextTick(() => {
    router.replace({
      path: `/redirect${fullPath}`
    })
  })
}

// 右键关闭菜单
const closeMenu = () => {
  state.visible = false
}
// 关闭其他标签
const closeOthersTags = () => {
  router.push(state.selectedTag)
  tagsViewStore.delOthersVisitedViews(state.selectedTag)
}
// 关闭所有标签
const closeAllTags = (view: MyRoute) => {
  tagsViewStore.delAllVisitedViews().then((elVisitedViews: MyRoute[]) => {
    if (state.affixTags.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(elVisitedViews, view)
  })
}
// 跳转最后一个标签
const toLastView = (elVisitedViews: MyRoute[], view: MyRoute) => {
  // elVisitedViews.at(-1)获取数组最后一个元素
  const latestView = elVisitedViews.at(-1)
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    if (view.name === 'Home') {
      // to reload home page
      router.replace({ path: `/redirect${view.fullPath}` })
    } else {
      router.push('/')
    }
  }
}

// export to page use
const { visible, top, left, selectedTag } = toRefs(state)
</script>

<template>
  <div id="tags-view-container" class="tags-view-container">
    <div class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="refTag"
        :key="tag.path"
        v-slot="{ navigate }"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        custom
      >
        <div
          class="tags-view-item"
          :class="isActive(tag) ? 'active' : ''"
          @contextmenu.prevent="openMenu(tag, $event)"
          @click="navigate"
        >
          {{ tag.title }}
          <Close
            v-if="!isAffix(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
          />
        </div>
      </router-link>
    </div>
    <div style="position: relative; top: -6px">
      <div v-show="visible" class="triangle" :style="{ left: left + 'px' }" />
      <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
        <li @click="refreshSelectedTag(selectedTag)">{{ 'Refresh' }}</li>
        <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
          {{ 'Close' }}
        </li>
        <li @click="closeOthersTags">{{ 'Close Others' }}</li>
        <li @click="closeAllTags(selectedTag)">{{ 'Close All' }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 三角形汽包
.triangle {
  position: relative;
  left: 10px;
  z-index: 100;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  opacity: 0.4;
  border-bottom-color: #eee;
}

.tags-view-container {
  position: relative;
  border-bottom: 1px solid var(--tags-view-border-bottom);
  width: 100%;
  height: var(--tag-view-height);
  background: var(--tags-view-background);
  box-shadow: var(--tags-view-box-shadow);

  .tags-view-wrapper {
    .tags-view-item {
      position: relative;
      display: inline-block;
      height: 27px;
      padding: 0 8px;
      margin-top: 3px;
      margin-left: 5px;
      font-size: 12px;
      line-height: 26px;
      color: var(--tags-view-item-color);
      cursor: pointer;
      background: var(--tags-view-item-background);
      border: 1px solid var(--tags-view-item-border-color);

      &:first-of-type {
        margin-left: 10px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        border-color: var(--tags-view-item-active-border-color);
        color: var(--tags-view-item-active-color);
        background-color: var(--tags-view-item-active-background);

        &::before {
          position: relative;
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 2px;
          background: var(--tags-view-contextmenu-background);
          border-radius: 50%;
          content: '';
        }
      }
    }
  }

  .contextmenu {
    position: absolute;
    z-index: 100;
    padding: 5px 0;
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: var(--tags-view-contextmenu-color);
    list-style-type: none;
    background: var(--tags-view-contextmenu-background);
    border-radius: 4px;
    box-shadow: var(--tags-view-contextmenu-box-shadow);

    li {
      padding: 7px 16px;
      margin: 0;
      cursor: pointer;
      background: var(--tags-view-contextmenu-hover-background);
    }
  }
}
</style>

<style lang="scss">
// reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    border-radius: 3px;

    .el-icon-close {
      width: 12px;
      height: 12px;
      vertical-align: -2px;
      border-radius: 6px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:hover {
        color: var(--tags-view-close-icon-hover-color);
        background-color: var(--tags-view-close-icon-hover-background);
      }
    }
  }
}
</style>
