<template>
  <ORadarNode class="radar-node-placeholder" aria-busy aria-hidden />
</template>

<script lang="ts" setup>
  import { useColorTheme } from '@prefecthq/prefect-design'
  import { ref, computed, watch } from 'vue'
  import ORadarNode from '@/components/RadarNode.vue'
  const { value } = useColorTheme()
  const computedStyle = ref(getComputedStyle(document.body))

  const style = computed(() => {
    return {
      placeholder: computedStyle.value.getPropertyValue('--background-400').split(' ').join(','),
    }
  })

  watch(value, () => {
    computedStyle.value = getComputedStyle(document.body)
  })
</script>

<style>
.radar-node-placeholder {
  @apply
  cursor-progress
  pointer-events-none
  relative
  overflow-hidden
  w-[18rem]
  min-h-[56px]
}

.radar-node-placeholder::before, .radar-node-placeholder::after {
  content: '';
  @apply
  top-0
  left-0
  right-0
  bottom-0
  absolute
  z-[2]
}

.radar-node-placeholder::before {
  @apply
  bg-background
}

.radar-node-placeholder::after {
  animation: node-placeholder-animation 2s cubic-bezier(0, 0.35, 1, 0.35) infinite;
  background: linear-gradient(
    90deg,
    hsla(v-bind('style.placeholder'), 0) 0%,
    hsla(v-bind('style.placeholder'), 0.2) 20%,
    hsla(v-bind('style.placeholder'), 0.5) 60%,
    hsla(v-bind('style.placeholder'), 0.2) 80%,
    hsla(v-bind('style.placeholder'), 0)
  );
  transform: translateX(-100%);
}

@keyframes node-placeholder-animation {
  100% {
    transform: translateX(100%);
  }
}
</style>