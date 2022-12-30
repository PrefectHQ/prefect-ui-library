<template>
  <template v-if="can.read.worker_pool">
    <p-link :to="routes.workerPool(workerPoolName)" class="worker-pool-icon-text">
      <p-icon-text icon="DatabaseIcon">
        <span>{{ workerPoolName }}</span>
      </p-icon-text>
    </p-link>
  </template>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue'
  import { useCan, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    workerPoolName: string,
  }>()

  const can = useCan()
  const routes = useWorkspaceRoutes()
  const { workerPoolName } = toRefs(props)
</script>