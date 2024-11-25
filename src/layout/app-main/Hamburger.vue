<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['toggleClick'])
// 切换左侧栏关闭和隐藏
const toggleClick = () => {
  emit('toggleClick')
}
</script>

<template>
  <div style="padding: 0 12px" @click="toggleClick">
    <svg-icon icon-class="hamburger" :class="{ 'is-active': isActive }" class="hamburger-style" />
  </div>
</template>

<style scoped lang="scss">
.hamburger-style {
  width: var(--hamburger-width);
  height: var(--hamburger-height);
  color: var(--hamburger-color);
  cursor: pointer;
}

.hamburger-style.is-active {
  transform: rotate(180deg);
}
</style>
