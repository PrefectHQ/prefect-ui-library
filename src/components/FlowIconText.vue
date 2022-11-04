<template>
  <template v-if="can.read.flow">
    <p-link :to="flowRoute(flowId)" class="flow-icon-text">
      <p-icon-text icon="Flow">
        <span>{{ flowName }}</span>
      </p-icon-text>
    </p-link>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useFlow } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { flowRouteKey } from '@/router/routes'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flowId: string,
  }>()

  const can = useCan()
  const flowRoute = inject(flowRouteKey)
  const flowId = computed(() => props.flowId)
  const flow = useFlow(flowId)
  const flowName = computed(() => flow.value?.name)
</script>