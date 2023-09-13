<template>
  <div class="deployment-relationships">
    <FlowRunFlow v-if="deployment.flowId" :flow-id="deployment.flowId" />
    <FlowRunWorkPool v-if="deployment.workPoolName" :work-pool-name="deployment.workPoolName" />
    <FlowRunWorkQueue
      v-if="deployment.workQueueName"
      :work-queue-name="deployment.workQueueName"
      :work-pool-name="deployment.workPoolName"
    />
  </div>
</template>

<script setup lang="ts">
  import FlowRunFlow from '@/components/FlowRunFlow.vue'
  import FlowRunWorkPool from '@/components/FlowRunWorkPool.vue'
  import FlowRunWorkQueue from '@/components/FlowRunWorkQueue.vue'
  import { Deployment } from '@/models'

  defineProps<{
    deployment: Deployment,
  }>()
</script>

<style>
.deployment-relationships { @apply
  flex
  flex-col
  items-start
  text-xs
  font-medium
  gap-2
  mr-1
  md:items-center
  md:flex-wrap
  md:flex-row
  md:gap-4
}
</style>