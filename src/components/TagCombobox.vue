<template>
  <p-combobox v-model="internalValue" :options="options" :empty-message="emptyMessage">
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
  import { computed, ComputedRef } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { UnionFilters } from '@/types'
  import { dateFunctions } from '@/utilities/timezone'

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

  const defaultStartDate = dateFunctions.subDays(dateFunctions.startOfToday(), 30)
  const subscriptionOptions = {
    interval: 30000,
  }


  const recentFlowRunFilter: UnionFilters = computed(() => {
    const filter = {
      'flow_runs': {
        'expected_start_time': {
          after_: defaultStartDate,
        },
      },
      sort: 'EXPECTED_START_TIME_DESC',
    }
    return filter
  })
  const flowRunsSubscription = useSubscription(api.flowRuns.getFlowRuns, [recentFlowRunFilter], subscriptionOptions)
  const flowRuns = computed(() => flowRunsSubscription.response ?? [])

  const recentFlowRunTags: ComputedRef<string[][]> = computed(() => flowRuns.value.map(run => run.tags ?? []))
  const tagList = computed(() => recentFlowRunTags.value.flat())
  const options = computed(() => [...new Set(tagList.value)])
</script>