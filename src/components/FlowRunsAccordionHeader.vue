<template>
  <div :id="flow.id" class="flow-runs-accordion-header">
    <div class="flow-runs-accordion-header__content">
      <p-link :to="routes.flow(flow.id)" class="flow-runs-accordion-header__name">
        {{ flow.name }}
      </p-link>

      <template v-if="lastFlowRun?.startTime">
        <FormattedDate :date="lastFlowRun.startTime" format="relative">
          <template #default="{ date }">
            <span class="flow-runs-accordion-header__time ">{{ date }}</span>
          </template>
        </FormattedDate>
      </template>
    </div>

    <span class="flow-runs-accordion-header__count">
      {{ count }}
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FormattedDate from '@/components/FormattedDate.vue'
  import { useFlowRunsCount } from '@/compositions/useFlowRunsCount'
  import { useLastFlowRun } from '@/compositions/useLastFlowRun'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { FlowRunsFilter } from '@/models/Filters'
  import { Flow } from '@/models/Flow'

  const props = defineProps<{
    flow: Flow,
    filter?: FlowRunsFilter,
  }>()

  const routes = useWorkspaceRoutes()

  const filter = computed<FlowRunsFilter>(() => ({
    ...props.filter,
    flows: {
      ...props.filter?.flows,
      id: [props.flow.id],
    },
  }))

  const { flowRun: lastFlowRun } = useLastFlowRun(filter)
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
  grid-cols-1
  text-left
}

.flow-runs-accordion-header__time { @apply
  text-sm
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