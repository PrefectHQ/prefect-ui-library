<template>
  <div :class="classes" :styles="styles" class="flow-list-item-container">
    <StateListItem v-bind="attrs" :disabled="disabled" class="flow-list-item" :state-type="flowState">
      <template #name>
        <p-link :to="routes.flow(flow.id)">
          <p-heading :heading="5">
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

      <div class="flow-list-item__content" :class="computedClasses.content" @click="toggle">
        <p-divider class="flow-list-item__divider" />
        <p-button
          v-if="deploymentsCount > 0"
          size="xs"
          class="flow-list-item__content-toggle"
          :class="computedClasses.toggle"
          inset
          icon="ChevronDownIcon"
        />

        <span v-if="deploymentsCount > 0" class="flow-list-item__content-text">
          {{ deploymentsCount }}  {{ toPluralString(localization.info.deployment, deploymentsCount) }}
        </span>

        <span v-else class="flow-list-item__content-text-none">
          {{ localization.info.noDeployments }}

          <ExtraInfoModal :title="localization.info.noDeployments">
            <p-markdown-renderer :text="localization.info.deploymentsEmptyStateDescription(flow.name)" />
            <template #actions>
              <DocumentationButton :to="localization.docs.deployments" />
            </template>
          </ExtraInfoModal>
        </span>
      </div>
    </StateListItem>

    <keep-alive v-if="canExpand">
      <p-auto-height-transition>
        <template v-if="expanded">
          <slot>
            <DeploymentList :disabled="disabled" :filter="filter" class="flow-list-item__deployments" />
          </slot>
        </template>
      </p-auto-height-transition>
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
  import { toPluralString, useAttrsStylesAndClasses } from '@prefecthq/prefect-design'
  import { useLocalStorage } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { DeploymentList, DocumentationButton, ExtraInfoModal, ListItemMetaFlowRun, StateListItem } from '@/components'
  import { useNextFlowRun, useLastFlowRun, useWorkspaceRoutes, useComponent, useDeploymentsCount } from '@/compositions'
  import { localization } from '@/localization'
  import { Flow, FlowsFilter } from '@/models'

  const props = defineProps<{
    flow: Flow,
    filter?: FlowsFilter,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const { FlowMenu } = useComponent()
  const { attrs, classes, styles } = useAttrsStylesAndClasses()
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

  const { count } = useDeploymentsCount(filter)
  const { flowRun: nextRun } = useNextFlowRun(filter)
  const { flowRun: lastRun } = useLastFlowRun(filter)

  const flowState = computed(() => lastRun.value?.state?.type)
  const deploymentsCount = computed(() => count.value ?? 0)
  const canExpand = computed(() => deploymentsCount.value && deploymentsCount.value > 0)

  const toggle = (): void => {
    if (!canExpand.value) {
      return
    }

    expanded.value = !expanded.value
  }

  const handleDelete = (): void => {
    emit('delete', props.flow.id)
  }

  const computedClasses = computed(() => ({
    content: {
      'flow-list-item__content--can-expand': canExpand.value,
    },
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
  text-sm
  w-full
}

.flow-list-item__content--can-expand { @apply
  cursor-pointer
}

.flow-list-item__content-text-none { @apply
  text-foreground-200
  flex
  items-center
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