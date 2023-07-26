<template>
  <div :id="id" class="flow-runs-accordion-header">
    <div class="flow-runs-accordion-header__content">
      <p-link :to="routes.flow(flow.id)" class="flow-runs-accordion-header__name">
        {{ flow.name }}
      </p-link>
      <span class="flow-runs-accordion-header__time">
        {{ lastRunTime }}
      </span>
    </div>
    <p-button inset size="sm" :aria-controls="content" @click="toggle">
      {{ count }}
      <p-icon size="small" icon="ChevronDownIcon" class="flow-runs-accordion-header__icon" :class="classes.icon" />
    </p-button>
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
    id: string,
    selected: boolean,
    content: string,
    toggle: () => void,
    filter?: FlowRunsFilter,
  }>()

  const routes = useWorkspaceRoutes()
  const { now } = useNow({ interval: 1000 })

  const classes = computed(() => ({
    icon: {
      'flow-runs-accordion-header__icon--selected': props.selected,
    },
  }))

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
  items-start
  gap-2
  justify-between
  border-t
  border-foreground-200
  py-2
}

.flow-runs-accordion-header__content { @apply
  grid
  gap-0.5
  grid-cols-1
}

.flow-runs-accordion-header__time { @apply
  text-xs
  text-foreground-200
}

.flow-runs-accordion-header__icon { @apply
  transition-transform
}

.flow-runs-accordion-header__icon--selected { @apply
  rotate-180
}
</style>