<template>
  <div class="flow-list-item-container">
    <StateListItem v-model:selected="selected" v-bind="attrs" class="flow-list-item" :class="classes.listItem" :state-type="flowState">
      <template #name>
        <p-link :to="routes.flow(flow.id)">
          <p-heading :heading="5">
            {{ flow.name }}
          </p-heading>
        </p-link>
      </template>

      <template #meta>
        <template v-if="lastRun">
          <ListItemMetaFlowRun :title="localization.info.lastRun" :flow-run="lastRun" />
        </template>
        <template v-if="nextRun">
          <ListItemMetaFlowRun :title="localization.info.nextRun" :flow-run="nextRun" />
        </template>
      </template>

      <template #relationships>
        <div class="flow-list-item__relationships" @click="toggle">
          <p-divider />
          <div v-if="deploymentsCountSubscription.executed">
            <p-button
              size="xs"
              class="flow-list-item__relationships-toggle"
              :class="classes.toggle"
              inset
              icon="ChevronDownIcon"
            />
            {{ deploymentsCount }}  {{ toPluralString(localization.info.deployment, deploymentsCount) }}
          </div>
        </div>
      </template>
    </StateListItem>

    <FlowListItemDeployments v-show="expanded" :flow="flow" :filter="deploymentsFilter" class="flow-list-item__deployments" />
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
  import { toPluralString } from '@prefecthq/prefect-design'
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref, useAttrs } from 'vue'
  import { FlowListItemDeployments, ListItemMetaFlowRun, StateListItem } from '@/components'
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
  const expanded = ref(true)

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
  const deploymentsCount = computed(() => deploymentsCountSubscription.response ?? 0)

  const flowRunsFilter = computed<FlowRunsFilter>(() => {
    return {
      flows: {
        id: [props.flow.id],
      },
    }
  })

  const { flowRun: nextRun } = useNextFlowRun(flowRunsFilter)
  const { flowRun: lastRun } = useLastFlowRun(flowRunsFilter)

  const flowState = computed(() => {
    return lastRun.value?.state?.type ?? nextRun.value?.state?.type ?? undefined
  })

  const toggle = (): void => {
    expanded.value = !expanded.value
  }

  const classes = computed(() => ({
    listItem: {
      'flow-list-item--expanded': expanded.value,
    },
    toggle: {
      'flow-list-item__relationships-toggle--expanded': expanded.value,
    },
  }))
</script>

<style>
.flow-list-item--expanded { @apply
  rounded-bl-sm
}

.flow-list-item-container { @apply
  relative
}

.flow-list-item__deployments { @apply
  sm:pr-4
  sm:ml-2
}

.flow-list-item__deployments::before {
  content: '';

  @apply
  absolute
  left-0
  sm:left-2
  top-5
  bottom-5
  border-l
  border-foreground-100
  pointer-events-none
  rounded-full
  z-[-1]
}

.flow-list-item .state-list-item__meta { @apply
  gap-8
}

.flow-list-item__relationships { @apply
  cursor-pointer
  w-full
}

.flow-list-item__relationships-toggle { @apply
  relative
  rounded-full
  transition-transform
  mr-2
}

.flow-list-item__relationships-toggle--expanded { @apply
  rotate-180
}
</style>