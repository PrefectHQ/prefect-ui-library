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
  import { WorkerPoolMenu, WorkerPoolToggle } from '@/components'
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

<style>
.worker-pool-card { @apply
  grid
  gap-2
}

.worker-pool-card__header { @apply
  flex
  gap-2
  items-center
  justify-between
}

.worker-pool-card__name { @apply
  text-lg
}

.worker-pool-card__header-actions { @apply
  flex
  gap-2
  items-center
}

.worker-pool-card__description { @apply
  text-sm
}

.worker-pool-card__details-label { @apply
  font-medium
  mr-2
}
</style>

