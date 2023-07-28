<template>
  <p-tags-input v-model="internalValue" placeholder="Search or enter new tag" :options="options" :empty-message="emptyMessage" />
</template>

<script lang="ts" setup>
  import { computed, toRefs } from 'vue'
  import { useFlowRuns } from '@/compositions'
  import { FlowRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    selected: string[] | null | undefined,
    emptyMessage?: string,
    filter?: FlowRunsFilter,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string[] | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emits('update:selected', value)
    },
  })

  const { filter } = toRefs(props)
  const { flowRuns } = useFlowRuns(filter)
  const tagList = computed(() => flowRuns.value.flatMap(run => run.tags ?? []))
  const options = computed(() => [...new Set(tagList.value)])
</script>