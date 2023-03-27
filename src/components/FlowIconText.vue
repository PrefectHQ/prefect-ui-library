<template>
  <template v-if="can.read.flow">
    <p-link :to="routes.flow(flowId)" class="flow-icon-text">
      <p-icon-text icon="Flow">
        <span>{{ flowName }}</span>
      </p-icon-text>
    </p-link>
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
  const { flow } = useFlow(flowId)
  const flowName = computed(() => flow.value?.name)
</script>