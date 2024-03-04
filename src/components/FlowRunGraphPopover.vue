<template>
  <p-pop-over
    ref="popOver"
    auto-close
    :placement="placement"
    :style="invisibleTargetStyles"
  >
    <div class="flow-run-graph-popover">
      <slot />
    </div>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import { GraphSelectionPosition } from '@prefecthq/graphs'
  import { PPopOver, positions } from '@prefecthq/prefect-design'
  import { StyleValue, computed, onMounted, ref } from 'vue'

  const props = defineProps<{
    position: GraphSelectionPosition,
  }>()

  const popOver = ref<InstanceType<typeof PPopOver>>()

  const placement = [positions.bottom, positions.top, positions.left, positions.right]

  const invisibleTargetStyles = computed<StyleValue>(() => ({
    cursor: 'pointer',
    position: 'absolute',
    top: `${props.position.y}px`,
    left: `${props.position.x}px`,
    width: `${props.position.width}px`,
    height: `${props.position.height}px`,
  }))

  onMounted(() => {
    setTimeout(() => {
      popOver.value?.open()
    }, 0)
  })
</script>

<style>
.flow-run-graph-popover { @apply
  bg-floating
  rounded-md
  p-3
  m-1
  shadow-lg
}
</style>