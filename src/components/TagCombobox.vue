<template>
  <p-combobox v-model="internalValue" placeholder="Search or enter new tag" allow-unknown-value :options="options" :empty-message="emptyMessage">
    <template #combobox-options-empty>
      No tags
    </template>
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
    <template #option="{ option }">
      <slot name="option" :option="option" />
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi, useFlowRunFilterFromRoute } from '@/compositions'


  const props = defineProps<{
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const multiple = computed(() => Array.isArray(props.selected))

  const internalValue = computed<typeof props.selected>({
    get() {
      return props.selected ?? null
    },
    set(value: string | string[] | null | undefined) {
      if (!value) {
        emits('update:selected', null)
      } else if (multiple.value) {
        emits('update:selected', Array.isArray(value) ? value : [value])
      } else {
        emits('update:selected', value)
      }
    },
  })

  const api = useWorkspaceApi()
  const { filter } = useFlowRunFilterFromRoute()

  const flowRunsSubscription = useSubscription(api.flowRuns.getFlowRuns, [filter])
  const flowRuns = computed(() => flowRunsSubscription.response ?? [])
  const tagList = computed(() => flowRuns.value.flatMap(run => run.tags ?? []))
  const options = computed(() => [...new Set(tagList.value)])
</script>