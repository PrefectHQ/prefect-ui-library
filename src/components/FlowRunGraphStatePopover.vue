<template>
  <FlowRunGraphPopover
    v-if="selection.position"
    :position="selection.position"
    @on-close="onClose"
  >
    <div class="flow-run-graph-state-popover">
      <p-key-value label="State">
        <template #value>
          {{ selection.name }}
        </template>
      </p-key-value>
      <p-key-value label="Occurred">
        <template #value>
          <FormattedDate :date="selection.timestamp" format="numeric" />
        </template>
      </p-key-value>
    </div>
  </FlowRunGraphPopover>
</template>

<script lang="ts" setup>
  import { StateSelection } from '@prefecthq/graphs'
  import { FlowRunGraphPopover } from '@/components'
  import FormattedDate from '@/components/FormattedDate.vue'

  defineProps<{
    selection: StateSelection,
  }>()

  const emit = defineEmits<{
    'update:selection': [null],
  }>()

  const onClose = (): void => {
    emit('update:selection', null)
  }
</script>

<style>
.flow-run-graph-state-popover { @apply
  flex
  flex-col
  gap-2
}

.flow-run-graph-artifacts-popover__label { @apply
  w-full
  text-xs
  text-subdued
  mb-1
}
</style>