<template>
  <div class="flow-list-item-container">
    <StateListItem v-model:selected="selected" v-bind="attrs" class="flow-list-item">
      <template #name>
        <p-link :to="routes.flow(flow.id)">
          <p-heading :heading="5">
            {{ flow.name }}
          </p-heading>
        </p-link>
      </template>

      <template #meta>
        <template v-if="nextRun">
          <div class="flow-list-item__relation">
            <span>{{ localization.info.nextRun }}</span> <FlowRunIconText :flow-run-id="nextRun.id" />
          </div>
        </template>

        <template v-if="lastRun">
          <div class="flow-list-item__relation">
            <span>{{ localization.info.lastRun }}</span> <FlowRunIconText :flow-run-id="lastRun.id" />
          </div>
        </template>
      </template>

      <template #relationships>
        {{ deploymentsCount }}
      </template>
    </StateListItem>

    <FlowListItemDeployments :filter="deploymentsFilter" class="flow-list-item__deployments" />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'FlowListItem',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref, useAttrs } from 'vue'
  import { FlowListItemDeployments, FlowRunIconText, StateListItem } from '@/components'
  import { useNextFlowRun, useLastFlowRun, useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { DeploymentsFilter, Flow, FlowRunsFilter } from '@/models'

  const props = defineProps<{
    flow: Flow,
    filter?: DeploymentsFilter,
  }>()

  const attrs = useAttrs()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const selected = ref([])

  const deploymentsFilter = computed<DeploymentsFilter>(() => {
    const filter = {
      ...props.filter,
      flows: {
        id: [props.flow.id],
      },
    }

    return filter
  })
  const deploymentsSubscriptionArgs = computed<[DeploymentsFilter]>(() => [deploymentsFilter.value])
  const deploymentsCountSubscription = useSubscriptionWithDependencies(
    api.deployments.getDeploymentsCount,
    deploymentsSubscriptionArgs,
  )
  const deploymentsCount = computed(() => deploymentsCountSubscription.response)

  const flowRunsFilter = computed<FlowRunsFilter>(() => {
    return {
      flows: {
        id: [props.flow.id],
      },
    }
  })

  const { flowRun: nextRun } = useNextFlowRun(flowRunsFilter)
  const { flowRun: lastRun } = useLastFlowRun(flowRunsFilter)
</script>

<style>
.flow-list-item { @apply
  rounded-bl-none
  sm:rounded-bl
}

.flow-list-item__deployments { @apply
  sm:pr-4
  sm:ml-1
  relative
}

.flow-list-item__deployments::after {
  content: '';

  @apply
  absolute
  left-0
  top-0
  bottom-0
  border-l-[3px]
  w-2
  dark:border-background-600
  border-background-400
  rounded-b-full
  pointer-events-none
}

.flow-list-item__relation { @apply
  flex
  gap-1
  text-xs
  font-medium
}
</style>