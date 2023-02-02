<template>
  <p-tags-input v-model="internalValue" placeholder="Search or enter new tag" :options="options" :empty-message="emptyMessage" />
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRunFilter } from '@/types'

  const props = defineProps<{
    selected: string[] | null | undefined,
    emptyMessage?: string,
    filter: FlowRunFilter,
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

  const api = useWorkspaceApi()

  const flowRunsSubscription = useSubscription(api.flowRuns.getFlowRuns, [props.filter])
  const flowRuns = computed(() => flowRunsSubscription.response ?? [])
  const tagList = computed(() => flowRuns.value.flatMap(run => run.tags ?? []))
  const options = computed(() => [...new Set(tagList.value)])
</script>