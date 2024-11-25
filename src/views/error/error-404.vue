<template>
  <div class="error-container">
    <div class="error-content">not-found</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const state: any = reactive({
  jumpTime: 5,
  oops: '抱歉!',
  headline: '当前页面不存在...',
  info: '请检查您输入的网址是否正确，或点击下面的按钮返回首页。',
  btn: '返回首页',
  timer: 0
})

onMounted(() => {
  timeChange()
})

onBeforeUnmount(() => {
  clearInterval(state.timer)
})

function timeChange() {
  state.timer = setInterval(() => {
    if (state.jumpTime) {
      state.jumpTime--
    } else {
      router.replace({ path: '/' })
      clearInterval(state.timer)
    }
  }, 1000)
}
</script>

<style lang="scss" scoped>
.error-container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
