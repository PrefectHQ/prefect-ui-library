<template>
  <page-heading class="page-heading-worker-pool" :crumbs="crumbs">
    <template #actions>
      <WorkerPoolToggle :worker-pool="workerPool" @update="emit('update')" />
      <WorkerPoolMenu :worker-pool="workerPool" :show-all="!media.sm" @delete="handleDelete" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { useRouter } from 'vue-router'
  import { PageHeading, WorkerPoolToggle, WorkerPoolMenu } from '@/components'
  import { useWorkspaceRoutes } from '@/compositions'
  import { WorkerPool } from '@/models'

  const props = defineProps<{
    workerPool: WorkerPool,
  }>()

  const routes = useWorkspaceRoutes()
  const router = useRouter()

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const crumbs = [{ text: 'Worker Pools', to: routes.workerPools() }, { text: props.workerPool.name }]

  const handleDelete = (): void => {
    router.back()
  }
</script>