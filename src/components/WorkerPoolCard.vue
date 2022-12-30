<template>
  <p-card class="worker-pool-card">
    <div class="worker-pool-card__header">
      <div class="worker-pool-card__heading">
        <p-link class="worker-pool-card__name" :to="routes.workerPool(workerPool.name)">
          {{ workerPool.name }}
        </p-link>
        <ProcessTypeBadge :type-label="workerPool.typeLabel" />
      </div>

      <div class="worker-pool-card__header-actions">
        <WorkerPoolLateIndicator :worker-pool-name="workerPool.name" />
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
      <div>
        <span class="worker-pool-card__details-label">Concurrency Limit</span>
        {{ workerPool.concurrencyLimit ? workerPool.concurrencyLimit : 'Unlimited' }}
      </div>


      <div v-if="workerPoolWorkers.length">
        <span class="worker-pool-card__details-label">Last Polled</span>
        {{ formatDateTimeRelative(lastWorkerHeartbeat, currentTime) }}
      </div>
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { WorkerPoolMenu, WorkerPoolToggle, ProcessTypeBadge, WorkerPoolLateIndicator } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { WorkerPool } from '@/models'
  import { now, formatDateTimeRelative } from '@/utilities'

  const props = defineProps<{
    workerPool: WorkerPool,
  }>()

  const routes = useWorkspaceRoutes()

  const api = useWorkspaceApi()
  const subscriptionOptions = {
    interval: 30000,
  }
  const currentTime = now()

  const workerPoolWorkersSubscription = useSubscription(api.workerPoolWorkers.getWorkers, [props.workerPool.name, {}], subscriptionOptions)
  const workerPoolWorkers = computed(() => workerPoolWorkersSubscription.response ?? [])
  const lastWorkerHeartbeat = computed(() => workerPoolWorkers.value[0].lastHeartbeatTime)

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

.worker-pool-card__details { @apply
  flex
  gap-8
  items-center
  text-sm
}

.worker-pool-card__details-label { @apply
  font-medium
  mr-2
}

.worker-pool-card__heading { @apply
  flex
  gap-2
  items-center
}
</style>
