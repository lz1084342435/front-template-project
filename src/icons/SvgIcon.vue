<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})

const iconName = computed(() => `#icon-${props.iconClass}`)
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
</script>

<style scoped lang="scss">
.sub-el-icon,
.nav-icon {
  position: relative;
  display: inline-block;
  margin-right: 6px;
  font-size: 15px;
}

.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  vertical-align: -2px;
  fill: currentcolor;
}
</style>
