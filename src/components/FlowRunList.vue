<template>
  <p-virtual-scroller :items="flowRuns" class="flow-run-list">
    <template #default="{ item: flowRun }">
      <FlowRunListItem v-model:selected="model" v-bind="{ flowRun, selectable }" />
    </template>
  </p-virtual-scroller>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useComponent } from '@/compositions'
  import { FlowRun } from '@/models/FlowRun'

  const props = defineProps<{
    selected?: string[] | null,
    flowRuns: FlowRun[],
    selectable?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string[]): void,
  }>()

  const { FlowRunListItem } = useComponent()

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