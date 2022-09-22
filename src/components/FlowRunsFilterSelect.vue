<template>
  <p-select v-model="selectedFilter" :options="options" class="flow-runs-filter-select" />
</template>

<script setup lang="ts">
  import { formatDateTimeNumeric, parseDateTimeNumeric } from '@prefecthq/prefect-design'
  import { startOfToday, subDays } from 'date-fns'
  import { watch, ref, inject } from 'vue'
  import { useRouter } from 'vue-router'
  import { useFlowRunFilterFromRoute } from '@/compositions'
  import { stateType } from '@/models'
  import { flowRunsRouteKey, Route } from '@/router'

  const router = useRouter()
  const flowRunsRoute =  inject(flowRunsRouteKey)
  const { startDate, states } = useFlowRunFilterFromRoute()

  const options: { label: string, value: string }[] = [
    { label: 'One week (default)', value: 'week' },
    { label: 'One day', value: 'day' },
    { label: 'No scheduled (week)', value: 'noScheduled' },
  ]

  const selectedFilter = ref('week')

  watch(selectedFilter, async ()=> {
    await router.push(flowRunsRoute!())
    if (selectedFilter.value === 'noScheduled') {
      states.value = [...stateType.filter(state => state !== 'scheduled')]
      startDate.value = parseDateTimeNumeric(formatDateTimeNumeric(subDays(startOfToday(), 7)))
      return
    }
    if (selectedFilter.value === 'day') {
      startDate.value = parseDateTimeNumeric(formatDateTimeNumeric(subDays(startOfToday(), 1)))
      states.value = []
      return
    } if (selectedFilter.value === 'week') {
      states.value = []
      startDate.value = parseDateTimeNumeric(formatDateTimeNumeric(subDays(startOfToday(), 7)))
    }
  })
</script>

<style>
  .flow-runs-filter-select {
    @apply
    w-48
  }
</style>