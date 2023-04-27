<template>
  <div class="flow-run-graphs-panel" :class="classes">
    <div class="flex justify-end">
      <p-button size="xs" icon="XIcon" flat @click="closePanel" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed, toRefs } from 'vue'

  const props = defineProps<{
    floating: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'dismiss'): void,
  }>()

  const { floating } = toRefs(props)

  const classes = computed(() => {
    return {
      'flow-run-graphs-panel--floating': floating.value,
    }
  })

  function closePanel(): void {
    emit('dismiss')
  }
</script>

<style>
.flow-run-graphs-panel { @apply
  border
  bg-background
  dark:border-background-600
  w-full
  h-full
  p-4
  rounded-lg
  overflow-auto
}

.flow-run-graphs-panel--floating { @apply
  bg-opacity-80
  backdrop-blur
}
</style>
