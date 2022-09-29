<template>
  <VirtualScroller :items="flowRuns" class="flow-run-list">
    <template #default="{ item: flowRun }">
      <FlowRunListItem v-model:selected="model" v-bind="{ flowRun, disabled }" :deleted="deletedItem(flowRun.id)" />
    </template>
  </VirtualScroller>
</template>

<script lang="ts" setup>
  import { computed, ref, watchEffect } from 'vue'
  import FlowRunListItem from '@/components/FlowRunListItem.vue'
  import VirtualScroller from '@/components/VirtualScroller.vue'
  import { FlowRun } from '@/models/FlowRun'

  const props = defineProps<{
    selected: string[] | null,
    flowRuns: FlowRun[],
    disabled?: boolean,
    deleted?: string[],
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string[]): void,
  }>()

  const deletedItem = (flowRunId: string): boolean => {
    if (props.deleted) {
      return props.deleted.includes(flowRunId)
    }
    return false
  }

  const model = computed({
    get() {
      return props.selected ?? []
    },
    set(value: string[]) {
      emit('update:selected', value)
    },
  })

  watchEffect(() => {
    // console.log(props.deleted)
  })
</script>

<style>
.flow-run-list {
  --virtual-scroller-item-gap: theme('spacing.2')
}
</style>