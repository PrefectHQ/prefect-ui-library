<template>
  <div class="flow-list-item-container">
    <StateListItem v-model:selected="selected" v-bind="attrs" class="flow-list-item" :class="classes.listItem" :state-type="flowState">
      <template #name>
        <p-link :to="routes.flow(flow.id)">
          <p-heading :heading="3">
            {{ flow.name }}
          </p-heading>
        </p-link>
      </template>

      <template #meta>
        <ListItemMetaFlowRun :title="localization.info.lastRun" :flow-run="lastRun" />
      </template>

      <template #action>
        <FlowMenu size="xs" :flow="flow" show-all @delete="refresh" />
      </template>

      <div class="flow-list-item__content" @click="toggle">
        <p-divider class="flow-list-item__divider" />
        <div v-if="deploymentsCountSubscription.executed">
          <p-button
            size="xs"
            class="flow-list-item__content-toggle"
            :class="classes.toggle"
            inset
            icon="ChevronDownIcon"
          />
          {{ deploymentsCount }}  {{ toPluralString(localization.info.deployment, deploymentsCount) }}
        </div>
      </div>
    </StateListItem>

    <FlowListItemDeployments v-show="expanded" :flow="flow" :filter="filter" class="flow-list-item__deployments" />
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
  import { useNextFlowRun, useLastFlowRun, useWorkspaceApi, useWorkspaceRoutes, useComponent } from '@/compositions'
  import { localization } from '@/localization'
  import { DeploymentsFilter, Flow, FlowsFilter } from '@/models'

  const props = defineProps<{
    flow: Flow,
    filter?: FlowsFilter,
  }>()

  const { FlowMenu } = useComponent()
  const attrs = useAttrs()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const selected = ref([])
  const expanded = ref(true)

  const filter = computed(() => {
    return {
      ...props.filter,
      flows: {
        ...props.filter?.flows,
        id: [props.flow.id],
      },
    }
  })

  const deploymentsCountSubscriptionArgs = computed<[DeploymentsFilter]>(() => [filter.value])
  const deploymentsCountSubscription = useSubscriptionWithDependencies(
    api.deployments.getDeploymentsCount,
    deploymentsCountSubscriptionArgs,
  )
  const deploymentsCount = computed(() => deploymentsCountSubscription.response ?? 0)

  const { flowRun: nextRun } = useNextFlowRun(filter)
  const { flowRun: lastRun } = useLastFlowRun(filter)

  const flowState = computed(() => {
    return lastRun.value?.state?.type ?? nextRun.value?.state?.type ?? undefined
  })

  const toggle = (): void => {
    expanded.value = !expanded.value
  }

  const refresh = (): void => {
    // TODO: implement
  }

  const classes = computed(() => ({
    listItem: {
      'flow-list-item--expanded': expanded.value,
    },
    toggle: {
      'flow-list-item__content-toggle--expanded': expanded.value,
    },
  }))
</script>

<style>
.flow-list-item--expanded { @apply
  rounded-b-sm
}

.flow-list-item__deployments { @apply
  sm:pr-4
  sm:ml-2
}

.flow-list-item__content { @apply
  cursor-pointer
  w-full
}

.flow-list-item__content-toggle { @apply
  relative
  rounded-full
  transition-transform
  mr-2
}

.flow-list-item__content-toggle--expanded { @apply
  rotate-180
}
</style>