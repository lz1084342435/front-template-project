<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { ThemeTypeEnum } from '@/enum/themeEnum'
const configStore = useConfigStore()

const { theme } = storeToRefs(configStore)
const state = reactive({
  themeOptions: Object.entries(ThemeTypeEnum).map(([label, value]) => ({
    label,
    value
  }))
})
const handleSetTheme = (elTheme: string) => {
  configStore.setTheme(elTheme)
}
const { themeOptions } = toRefs(state)
</script>

<template>
  <el-dropdown trigger="hover" type="primary" @command="handleSetTheme">
    <svg-icon icon-class="theme-icon" style="width: 22px; height: 23px" class="mr-12px" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in themeOptions"
          :key="item.value"
          :command="item.value"
          :disabled="theme === item.value"
        >
          <h3 class="pt-6px pb-10px text-16px">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.svg-icon {
  &:focus {
    outline: none;
  }
}
</style>
