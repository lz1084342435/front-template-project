<script setup lang="ts">
// @ts-ignore
import screenfull from 'screenfull'
const state = reactive({
  isFullscreen: false
})
onMounted(() => {
  init()
})
onUnmounted(() => {
  destroy()
})
const toggleScreen = () => {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: 'you browser can not work',
      type: 'warning'
    })
    return false
  }
  screenfull.toggle()
}
const change = () => {
  state.isFullscreen = screenfull.isFullscreen
}
const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on('change', change)
  }
}
const destroy = () => {
  if (screenfull.isEnabled) {
    screenfull.off('change', change)
  }
}
const { isFullscreen } = toRefs(state)
</script>

<template>
  <svg-icon
    :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    class="mr-12px screen-full-icon"
    @click="toggleScreen"
  />
</template>

<style lang="scss" scoped>
.nav-svg-icon {
  margin-top: 4px;
  font-size: 18px;
  color: #5a5e66;
}

.screen-full-ion {
  width: 17px;
  height: 17px;
}
</style>
