<template>
  <div ref="target" class="flow-run-graph-popover" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue'

  const props = defineProps<{
    position?: {
      x: number,
      y: number,
    },
  }>()

  const emit = defineEmits<{
    'onClose': [null],
  }>()

  const target = ref<HTMLElement | null>(null)

  const styles = computed(() => ({
    top: `${props.position?.y ?? 0}px`,
    left: `${props.position?.x ?? 0}px`,
  }))

  onMounted(() => {
    setTimeout(() => {
      document.addEventListener('click', eventHandler)
      document.addEventListener('focusin', eventHandler)
    }, 0)
  })

  onUnmounted(() => {
    document.removeEventListener('click', eventHandler)
    document.removeEventListener('focusin', eventHandler)
  })

  function eventHandler(event: MouseEvent | FocusEvent): void {
    if (target.value?.contains(event.target as Node)) {
      return
    }

    close()
  }

  function close(): void {
    emit('onClose', null)
  }
</script>

<style>
.flow-run-graph-popover { @apply
  bg-floating
  rounded-md
  p-3
  shadow-lg
  absolute
  mt-2
  -translate-x-2/4;

  z-index: var(--p-pop-over-content-z-index, 100)
}
</style>