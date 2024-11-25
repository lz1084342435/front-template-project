<script setup lang="ts">
import { ArrowRightBold, Unlock } from '@element-plus/icons-vue'

const open = ref(false)
const slider = ref(null)
const sliderButton = ref(null)
let startX = 0
let distance = 0
let maxDistance = 0
let minDistance = 0
const isTrigger = ref(false)

const onMousedown = (e) => {
  distance = 0
  maxDistance = 0
  minDistance = 0
  isTrigger.value = false

  sliderButton.value.style.transition = ''
  startX = e.screenX
  maxDistance = slider.value.clientWidth - sliderButton.value.clientWidth - 10
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

const onMousemove = (e) => {
  distance = e.screenX - startX
  if (isTrigger.value) {
    distance = maxDistance
  }
  if (distance <= minDistance) {
    distance = minDistance
  }
  if (distance >= maxDistance) {
    distance = maxDistance
    if (!isTrigger.value) {
      isTrigger.value = true
      setTimeout(() => {
        open.value = false
      }, 300)
    }
  }
  if (open.value) {
    sliderButton.value.style.transform = `translateX(${distance}px)`
  }
}

const onMouseup = () => {
  document.removeEventListener('mousemove', onMousemove)
  document.removeEventListener('mouseup', onMouseup)

  if (!isTrigger.value) {
    // 恢复原始状态
    distance = 0
    maxDistance = 0
    minDistance = 0
    isTrigger.value = false

    if (open.value) {
      sliderButton.value.style.transition = 'all 0.4s'
      sliderButton.value.style.transform = `translateX(${distance}px)`
    }
  }
}
watch(
  () => open.value,
  () => {
    if (open.value) {
      isTrigger.value = false
    }
  }
)
const icon = computed(() => {
  return isTrigger.value ? Unlock : ArrowRightBold
})
</script>

<template>
  <svg-icon icon-class="lock" class="mr-12px screen-lock-icon" @click="open = true" />
  <Teleport to="body">
    <transition
      enter-active-class="screen-locker-lock"
      append-to-body
      leave-active-class="screen-locker-unlock"
    >
      <div v-if="open" class="screen-locker">
        <div class="screen-avatar">
          <div class="screen-nickname">CLOAK</div>
        </div>
        <div ref="slider" class="screen-slider">
          <div class="screen-locker-placeholder">滑动解锁</div>
          <div ref="sliderButton" class="screen-slider-button" @mousedown="onMousedown">
            <el-icon :size="25">
              <icon />
            </el-icon>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped lang="scss">
.screen-locker {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0 0 0 / 30%);
  box-shadow: 0 0 20px 5px #0000000f;

  /* backdrop-filter暂不兼容firefox */
  backdrop-filter: blur(10px);
  flex-direction: column;
}

.screen-lock-icon {
  width: 18px;
  height: 19px;
}

.screen-locker-lock {
  animation: lock-down 1s ease-in-out;
}

.screen-locker-unlock {
  animation: lock-up 1s ease-in-out;
}

@keyframes lock-down {
  0% {
    transform: translate3d(0, -100%, 0);
  }

  60% {
    transform: translate3d(0, 25px, 0);
  }

  75% {
    transform: translate3d(0, 0, 0);
  }

  90% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: none;
  }
}

@keyframes lock-up {
  0% {
    transform: translate3d(0, 0, 0);
  }

  90% {
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 0;
    transform: none;
  }
}

.screen-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  flex-direction: column;
}

.screen-nickname {
  margin-top: 10px;
  font-size: 30px;
  font-weight: 400;
}

.screen-slider {
  position: relative;
  width: 300px;
  height: 60px;
  border-radius: 100px;

  /* 背景渐变色大小 */
  background-size: 200%;
  box-shadow: 0 0 20px 2px rgb(0 0 0 / 15%);
  background-image: linear-gradient(
    to right,
    rgb(72 168 237 / 25%),
    rgb(255 255 255 / 40%),
    rgb(72 168 237 / 25%)
  );
  animation: sun 7s infinite;
}

.screen-slider::before {
  position: absolute;
  border-radius: 60px;
  content: '';
  opacity: 0.5;

  /* 设置模糊度 显示发光效果 */
  filter: blur(10px);
  inset: -6px;
  background-size: 200%;
  background-image: linear-gradient(
    to right,
    rgb(72 168 237 / 25%),
    rgb(255 255 255 / 40%),
    rgb(72 168 237 / 25%)
  );
  animation: sun 7s infinite;
}

.screen-slider-button {
  display: flex;
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px 2px rgb(0 0 0 / 15%);
  backdrop-filter: blur(10px);
}

.screen-locker-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  pointer-events: none;
  opacity: 0.5;
  transform: translate3d(-50%, -50%, 0);
  user-select: none;
}

@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}
</style>
