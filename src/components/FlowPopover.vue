<template>
  <p-pop-over :placement="placement">
    <template #target="{ open, close, toggle }">
      <!-- TODO: This doesn't actually open/close right now -->
      <slot v-bind="{ open, close, toggle, flow }">
        <FlowRouterLink :flow-id="flowId">
          <div v-if="flow" class="flow-popover__link" v-bind="$attrs">
            <p-icon icon="PFlow" small class="flow-popover__link-icon" />
            <span class="flow-popover__link-name" :title="flow.name">{{ flow.name }}</span>
          </div>
        </FlowRouterLink>
      </slot>
    </template>

    <p-card v-if="flow" class="flow-popover__card">
      <p-content>
        <FlowRouterLink :flow-id="flowId">
          <div v-if="flow" class="flow-popover__link">
            <p-icon icon="PFlow" small class="flow-popover__link-icon" />
            <span class="flow-popover__link-name" :title="flow.name">{{ flow.name }}</span>
          </div>
        </FlowRouterLink>

        <p-key-value label="Last run" alternate>
          <template #value>
            <LastFlowRun :flow-id="flowId" />
          </template>
        </p-key-value>

        <p-key-value label="Next run" alternate>
          <template #value>
            <NextFlowRun :flow-id="flowId" />
          </template>
        </p-key-value>
      </p-content>
    </p-card>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import { positions } from '@prefecthq/prefect-design'
  import { FlowRouterLink, NextFlowRun, LastFlowRun } from '@/components'
  import { useFlow } from '@/compositions'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    flowId: string,
  }>()

  const placement = [positions.top, positions.bottom, positions.right, positions.left]

  const { flow } = useFlow(() => props.flowId)
</script>

<style>
.flow-popover__link { @apply
  flex
  items-center
  gap-1
}

.flow-popover__link-name { @apply
  truncate
}

.flow-popover__link-icon { @apply
  shrink-0
  h-3
  w-3
}
</style>