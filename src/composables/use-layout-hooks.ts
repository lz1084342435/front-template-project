import { useSettingsStore } from '@/stores/settings'

export function useLayoutHooks() {
  const settingsStore = useSettingsStore()
  const isCollapse = computed<boolean>(() => settingsStore.isCollapse)
  const changeCollapse = (bool: boolean) => {
    console.log('bool===', bool)

    settingsStore.changeCollapse(bool)
  }
  return { isCollapse, changeCollapse }
}

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 深拷贝
export function cloneDeep(value: any) {
  return JSON.parse(JSON.stringify(value))
}
