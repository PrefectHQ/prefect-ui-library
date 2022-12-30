<template>
  <page-heading class="page-heading-worker-pool-queue" :crumbs="crumbs">
    <template #actions>
      <WorkerPoolQueueToggle :worker-pool-queue="workerPoolQueue" :worker-pool-name="workerPoolName" @update="emit('update')" />
      <WorkerPoolQueueMenu :worker-pool-queue="workerPoolQueue" :worker-pool-name="workerPoolName" :show-all="!media.sm" @delete="handleDelete" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { PageHeading, WorkerPoolQueueToggle, WorkerPoolQueueMenu } from '@/components'
  import { useWorkspaceRoutes } from '@/compositions'
  import { WorkerPoolQueue } from '@/models'

  const props = defineProps<{
    workerPoolName: string,
    workerPoolQueue: WorkerPoolQueue,
  }>()

  const routes = useWorkspaceRoutes()
  const router = useRouter()

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const crumbs = computed(() => [
    { text: 'Worker Pools', to: routes.workerPools() },
    { text: props.workerPoolName, to: routes.workerPool(props.workerPoolName) },
    { text: props.workerPoolQueue.name },
  ])

  const handleDelete = (): void => {
    router.back()
  }
</script>