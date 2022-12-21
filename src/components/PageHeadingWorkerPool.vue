<template>
  <page-heading class="page-heading-worker-pool" :crumbs="crumbs">
    <template #after-crumbs>
      <router-link v-if="can.update.worker_pool" :to="routes.workerPoolEdit(workerPool.name)">
        <p-button inset size="xs" icon="PlusIcon" />
      </router-link>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes, useCan } from '@/compositions'
  import { WorkerPool } from '@/models'

  const props = defineProps<{
    workerPool: WorkerPool,
  }>()

  const routes = useWorkspaceRoutes()

  const can = useCan()
  const crumbs = [{ text: 'Worker Pools', to: routes.workerPools() }, { text: props.workerPool.name }]
</script>