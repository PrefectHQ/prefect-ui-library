<template>
  <div class="flow-list-item-container">
    <StateListItem v-bind="attrs" :disabled="disabled" class="flow-list-item" :state-type="flowState">
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
    </StateListItem>

    <keep-alive>
      <template v-if="expanded">
        <slot>
          <template v-if="deploymentsCountSubscription.executed && deploymentsCount === 0">
            <slot name="empty">
              <FlowListItemDeploymentsEmptyState :flow="flow" class="flow-list-item__deployments-empty" />
              <slot />
            </slot>
          </template>
          <template v-else-if="!deploymentsCountSubscription.loading">
            <slot name="deployments">
              <DeploymentList :disabled="disabled" :filter="filter" class="flow-list-item__deployments" />
            </slot>
          </template>
          <template v-else>
            <p-loading-icon class="flow-list-item__loading-icon" />
          </template>
        </slot>
      </template>
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
  import { useLocalStorage, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, useAttrs } from 'vue'
  import { DeploymentList, FlowListItemDeploymentsEmptyState, ListItemMetaFlowRun, StateListItem } from '@/components'
  import { useNextFlowRun, useLastFlowRun, useWorkspaceApi, useWorkspaceRoutes, useComponent } from '@/compositions'
  import { localization } from '@/localization'
  import { DeploymentsFilter, Flow, FlowsFilter } from '@/models'

  const props = defineProps<{
    flow: Flow,
    filter?: FlowsFilter,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const { FlowMenu } = useComponent()
  const attrs = useAttrs()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const { value: expanded } = useLocalStorage(`flow-list-item-${props.flow.id}--expanded`, false)

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
    toggle: {
      'flow-list-item__content-toggle--expanded': expanded.value,
    },
  }))
</script>

<style>
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
  min-h-[1.25rem]
  w-full
}

.flow-list-item__next-run { @apply
  sm:justify-end
}

.flow-list-item__loading-icon { @apply
  mx-auto
}

.flow-list-item__deployments-empty { @apply
  p-4
}
</style>