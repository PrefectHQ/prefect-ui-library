<template>
  <ORadarNode class="radar-node-placeholder" aria-busy aria-hidden />
</template>

<script lang="ts" setup>
  import ORadarNode from '@/components/RadarNode.vue'
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
  bg-slate-100
}

.radar-node-placeholder::after {
  animation: node-placeholder-animation 2s cubic-bezier(0, 0.35, 1, 0.35) infinite;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0.1)
  );
  transform: translateX(-100%);
}

@keyframes node-placeholder-animation {
  100% {
    transform: translateX(100%);
  }
}
</style>