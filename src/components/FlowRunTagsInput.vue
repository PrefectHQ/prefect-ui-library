<template>
  <p-tags-input v-model="internalValue" class="flow-run-tags-input" placeholder="Search or enter new tag" v-bind="{ options, emptyMessage }" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useFlowRuns } from '@/compositions'
  import { FlowRunsFilter } from '@/models/Filters'
  import { unique } from '@/utilities/arrays'

  const props = defineProps<{
    selected: string[] | null | undefined,
    emptyMessage?: string,
    filter?: FlowRunsFilter,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string[] | null): void,
  }>()

  const emptyMessage = computed(() => props.emptyMessage ?? 'All tags')

  const internalValue = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emits('update:selected', value)
    },
  })

  const { flowRuns } = useFlowRuns(() => props.filter ?? {})

  const options = computed(() => {
    const tags = flowRuns.value.flatMap(run => run.tags ?? [])

    return unique(tags).sort((tagA, tagB) => tagA.localeCompare(tagB))
  })
</script>

<style>
.flow-run-tags-input {
  min-width: 128px;
}
</style>