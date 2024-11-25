import settings from '@/settings'
import type { MyRoute } from '#/basic'

export const useTagsViewStore = defineStore('tagsView', () => {
  let visitedViews = reactive<MyRoute[]>([])
  const addVisitedView = (view: MyRoute) => {
    // 判断添加的标签存在直接返回
    if (visitedViews.some((v) => v.path === view.path)) {
      return
    }
    // 添加的数量如果大于 setting.tagsViewNum,则替换最后一个元素，否则在visitedViews数组后插入一个元素
    if (visitedViews.length >= settings.tagsViewNum) {
      visitedViews.pop()
      visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
    } else {
      visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
    }
  }
  const delVisitedView = (view: MyRoute): Promise<MyRoute[]> => {
    return new Promise((resolve) => {
      // 匹配view.path元素将其删除
      for (const [i, v] of visitedViews.entries()) {
        if (v.path === view.path) {
          visitedViews.splice(i, 1)
          break
        }
      }
      resolve([...visitedViews])
    })
  }
  const delOthersVisitedViews = (view: MyRoute) => {
    return new Promise((resolve) => {
      visitedViews = visitedViews.filter((v: ObjKeys) => {
        return v.meta.affix || v.path === view.path
      })
      resolve([...visitedViews])
    })
  }
  const delAllVisitedViews = (): Promise<MyRoute[]> => {
    return new Promise((resolve) => {
      // keep affix tags
      visitedViews = visitedViews.filter((tag: ObjKeys) => tag.meta?.affix)
      resolve([...visitedViews])
    })
  }
  return {
    visitedViews,
    addVisitedView,
    delVisitedView,
    delOthersVisitedViews,
    delAllVisitedViews
  }
})
