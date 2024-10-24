<template>
  <template v-if="can.read.flow">
    <template v-if="flow">
      <p-link :to="routes.flow(flowId)" class="flow-icon-text">
        <p-icon-text icon="Flow">
          <span>{{ flowName }}</span>
        </p-icon-text>
      </p-link>
    </template>
    <template v-else-if="subscription.executed">
      <span>
        Flow not found
      </span>
    </template>
  </template>
  <template v-else>
    <span>
      No access
    </span>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useCan, useFlow, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    flowId: string,
  }>()

  const can = useCan()
  const routes = useWorkspaceRoutes()
  const flowId = computed(() => props.flowId)
  const { flow, subscription } = useFlow(flowId)
  const flowName = computed(() => flow.value?.name)
</script>