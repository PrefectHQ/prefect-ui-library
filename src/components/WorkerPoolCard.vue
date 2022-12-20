<template>
  <p-card class="worker-pool-card">
    <div class="worker-pool-card__header">
      <p-link class="worker-pool-card__name" :to="routes.workerPool(workerPool.name)">
        {{ workerPool.name }}
      </p-link>
      <div class="worker-pool-card__header-actions">
        <WorkerPoolToggle :worker-pool="workerPool" @update="emit('update')" />
        <WorkerPoolMenu :worker-pool="workerPool" @delete="emit('update')" />
      </div>
    </div>

    <template v-if="workerPool.description">
      <p class="worker-pool-card__description">
        {{ workerPool.description }}
      </p>
    </template>

    <div class="worker-pool-card__details">
      <span class="worker-pool-card__details-label">Concurrency Limit</span>
      {{ workerPool.concurrencyLimit }}
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { useWorkspaceRoutes } from '@/compositions'
  import { WorkerPool } from '@/models'

  defineProps<{
    workerPool: WorkerPool,
  }>()

  const routes = useWorkspaceRoutes()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()
</script>

