<template>
  <p-pop-over
    ref="popOver"
    class="flow-run-timeline-options"
    auto-close
    :placement="placement"
  >
    <template #target="{ toggle }">
      <p-button
        ref="settingsButton"
        aria-label="Flow Run Timeline Options"
        icon="CogIcon"
        flat
        @click="toggle"
      />
    </template>
    <div class="flow-run-timeline-options__popover">
      <p-overflow-menu>
        <div class="flow-run-timeline-options__popover-option-set">
          <p-radio-group v-model="layoutModel" :options="layoutOptions">
            <template #label="{ option }">
              {{ option.label }}
            </template>
          </p-radio-group>
        </div>
        <div class="flow-run-timeline-options__popover-option-set">
          <p-checkbox v-model="hideDependencyArrowsModel" label="Hide Dependency Arrows" />
        </div>
      </p-overflow-menu>
    </div>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import { TimelineNodesLayoutOptions } from '@prefecthq/graphs'
  import { PButton, positions, PPopOver } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'

  const props = defineProps<{
    layout: TimelineNodesLayoutOptions,
    hideEdges: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:layout', value: TimelineNodesLayoutOptions): void,
    (event: 'update:hideEdges', value: boolean): void,
  }>()

  const settingsButton = ref<typeof PButton>()
  const popOver = ref<typeof PPopOver>()
  const placement = [positions.topRight, positions.bottomRight, positions.topLeft, positions.bottomLeft]

  const layoutOptions: {
    value: TimelineNodesLayoutOptions,
    label: string,
  }[] = [
    {
      value: 'nearestParent',
      label: 'Nearest Parent Layout',
    }, {
      value: 'waterfall',
      label: 'Waterfall Layout (fast)',
    },
  ]
  const layoutModel = computed({
    get: () => props.layout,
    set: (layout: TimelineNodesLayoutOptions) => emit('update:layout', layout),
  })

  const hideDependencyArrowsModel = computed({
    get: () => props.hideEdges,
    set: () => emit('update:hideEdges', !props.hideEdges),
  })
</script>

<style>
.flow-run-timeline-options { @apply
  inline-block
}

.flow-run-timeline-options__popover { @apply
  py-1
}

.flow-run-timeline-options__popover-option-set { @apply
  p-3
}
.flow-run-timeline-options__popover-option-set label { @apply
  cursor-pointer
}
</style>
