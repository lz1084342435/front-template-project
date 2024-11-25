export const useSettingsStore = defineStore('settings', () => {
  const isCollapse = ref<boolean>(false)
  function changeCollapse(bool: boolean) {
    isCollapse.value = bool
  }

  return { isCollapse, changeCollapse }
})
