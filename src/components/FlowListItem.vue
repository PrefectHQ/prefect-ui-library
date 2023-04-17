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

      <template #relationships>
        <div class="flow-list-item__relationships-container">
          <ListItemMetaFlowRun :title="localization.info.lastRun" :flow-run="lastRun" class="flow-list-item__last-run" />
          <ListItemMetaFlowRun :title="localization.info.nextRun" :flow-run="nextRun" class="flow-list-item__next-run" />
        </div>
      </template>

      <template #action>
        <FlowMenu size="xs" :flow="flow" show-all @delete="handleDelete" />
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

          <span v-if="deploymentsCount > 0" class="flow-list-item__content-text">
            {{ deploymentsCount }}  {{ toPluralString(localization.info.deployment, deploymentsCount) }}
          </span>

          <span v-else class="flow-list-item__content-text-none">
            {{ localization.info.noDeployments }}
          </span>
        </div>
      </div>
    </StateListItem>

    <keep-alive>
      <FlowListItemDeployments v-if="expanded" :flow="flow" :filter="filter" class="flow-list-item__deployments" />
    </keep-alive>
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

  const emit = defineEmits<{
    (event: 'delete', value: string | null): void,
  }>()

  const { FlowMenu } = useComponent()
  const attrs = useAttrs()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const selected = ref([])
  const expanded = ref(false)

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

  const flowState = computed(() => lastRun.value?.state?.type)

  const toggle = (): void => {
    expanded.value = !expanded.value
  }

  const handleDelete = (): void => {
    emit('delete', props.flow.id)
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
  ml-4
  sm:ml-8
}

.flow-list-item__content { @apply
  cursor-pointer
  text-sm
  w-full
}

.flow-list-item__content-text-none { @apply
  text-foreground-200
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

.flow-list-item__relationships-container { @apply
  grow
  grid
  grid-cols-1
  grid-rows-2
  sm:grid-cols-2
  sm:grid-rows-1
  gap-2
  w-full
}

.flow-list-item__next-run { @apply
  sm:justify-end
}
</style>