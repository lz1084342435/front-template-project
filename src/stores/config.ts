import settings from '@/settings'
import { toggleHtmlClass } from '@/theme/utils'

export const useConfigStore = defineStore('config', () => {
  const theme = ref<string>(settings.defaultTheme)
  const setTheme = (data: string) => {
    theme.value = data
    toggleHtmlClass(data)
  }
  return {
    theme,
    setTheme
  }
})
