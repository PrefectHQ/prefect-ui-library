<template>
  <div class="work-pool-queues-table">
    {{ workerPoolQueues }}
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useCan, useWorkspaceRoutes } from '@/compositions'
  import { WorkerPoolQueue } from '@/models'

  const props = defineProps<{
    workerPoolQueues: WorkerPoolQueue[],
  }>()

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const can = useCan()
  const routes = useWorkspaceRoutes()

  const columns = [
    {
      label: 'selection',
      width: '20px',
      visible: can.delete.worker_pool_queue,
    },
    {
      property: 'name',
      label: 'Name',
    },
    {
      label: 'Concurrency',
    },
    {
      label: 'Priority',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]
</script>
