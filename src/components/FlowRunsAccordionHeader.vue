<template>
  <div :id="flow.id" class="flow-runs-accordion-header">
    <div class="flow-runs-accordion-header__content">
      <p-link :to="routes.flow(flow.id)" class="flow-runs-accordion-header__name">
        {{ flow.name }}
      </p-link>
      <span class="flow-runs-accordion-header__time">
        {{ lastRunTime }}
      </span>
    </div>

    <span class="flow-runs-accordion-header__count">
      {{ count }}
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { useNow } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useFlowRunsCount } from '@/compositions/useFlowRunsCount'
  import { useLastFlowRun } from '@/compositions/useLastFlowRun'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { FlowRunsFilter } from '@/models/Filters'
  import { Flow } from '@/models/Flow'
  import { formatDateTimeRelative } from '@/utilities/dates'

  const props = defineProps<{
    flow: Flow,
    filter?: FlowRunsFilter,
  }>()

  const routes = useWorkspaceRoutes()
  const { now } = useNow({ interval: 1000 })

  const filter = computed<FlowRunsFilter>(() => ({
    ...props.filter,
    flows: {
      ...props.filter?.flows,
      id: [props.flow.id],
    },
  }))
  const { flowRun: lastFlowRun } = useLastFlowRun(filter)

  const lastRunTime = computed(() => {
    if (lastFlowRun.value?.startTime) {
      return formatDateTimeRelative(lastFlowRun.value.startTime, now.value)
    }

    return undefined
  })

  const { count } = useFlowRunsCount(filter)
</script>

<style>
.flow-runs-accordion-header { @apply
  flex
  flex-1
  gap-2
  justify-between
  py-2
  items-center
}

.flow-runs-accordion-header__content { @apply
  grid
  gap-0.5
  grid-cols-1
  text-left
}

.flow-runs-accordion-header__time { @apply
  text-xs
  text-subdued
}

.flow-runs-accordion-header__count { @apply
  text-sm mr-2
}

.flow-runs-accordion-header__icon { @apply
  transition-transform
}

.flow-runs-accordion-header__icon--selected { @apply
  rotate-180
}

.flow-runs-accordion-header__name { @apply
  font-semibold
}
</style>