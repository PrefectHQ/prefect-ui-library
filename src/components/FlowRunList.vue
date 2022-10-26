<template>
  <p-virtual-scroller :items="flowRuns" class="flow-run-list">
    <template #default="{ item: flowRun }">
      <FlowRunListItem v-model:selected="model" v-bind="{ flowRun, disabled }" />
    </template>
  </p-virtual-scroller>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunListItem from '@/components/FlowRunListItem.vue'
  import { FlowRun } from '@/models/FlowRun'

  const props = defineProps<{
    selected: string[] | null,
    flowRuns: FlowRun[],
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string[]): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? []
    },
    set(value: string[]) {
      emit('update:selected', value)
    },
  })
</script>

<style>
.flow-run-list {
  --virtual-scroller-item-gap: theme('spacing.2')
}
</style>