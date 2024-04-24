<template>
  <p-pop-over :placement="placement">
    <template #target="{ open, close, toggle }">
      <slot v-bind="{ open, close, toggle, flow }">
        <FlowRouterLink :flow-id="flowId" @mouseover="open" @mouseout="close">
          <div v-if="flow" class="flow-popover__link" v-bind="$attrs">
            <p-icon icon="PFlow" small class="flow-popover__link-icon" />
            <span class="flow-popover__link-name">{{ flow.name }}</span>
          </div>
        </FlowRouterLink>
      </slot>
    </template>

    <p-card v-if="flow">
      {{ flow.name }}
    </p-card>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import { positions } from '@prefecthq/prefect-design'
  import { FlowRouterLink } from '@/components'
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
  shrink
  truncate
}

.flow-popover__link-icon { @apply
  h-3
  w-3
}
</style>