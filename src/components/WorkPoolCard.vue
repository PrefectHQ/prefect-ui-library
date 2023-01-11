<template>
  <p-card class="work-pool-card">
    <div class="work-pool-card__header">
      <div class="work-pool-card__heading">
        <p-link class="work-pool-card__name" :to="routes.workPool(workPool.name)">
          {{ workPool.name }}
        </p-link>
        <ProcessTypeBadge :type-label="workPool.typeLabel" />
      </div>

      <div class="work-pool-card__header-actions">
        <WorkersLateIndicator :work-pool-name="workPool.name" />
        <WorkPoolToggle :work-pool="workPool" @update="emit('update')" />
        <WorkPoolMenu :work-pool="workPool" @delete="emit('update')" />
      </div>
    </div>

    <template v-if="workPool.description">
      <p class="work-pool-card__description">
        {{ workPool.description }}
      </p>
    </template>

    <div class="work-pool-card__details">
      <div>
        <span class="work-pool-card__details-label">Concurrency Limit</span>
        {{ workPool.concurrencyLimit ? workPool.concurrencyLimit : 'Unlimited' }}
      </div>


      <div v-if="workPoolWorkers.length">
        <span class="work-pool-card__details-label">Last Polled</span>
        {{ formatDateTimeRelative(lastWorkerHeartbeat, currentTime) }}
      </div>
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { WorkPoolMenu, WorkPoolToggle, ProcessTypeBadge, WorkersLateIndicator } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { WorkPool } from '@/models'
  import { now, formatDateTimeRelative } from '@/utilities'

  const props = defineProps<{
    workPool: WorkPool,
  }>()

  const routes = useWorkspaceRoutes()

  const api = useWorkspaceApi()
  const subscriptionOptions = {
    interval: 30000,
  }
  const currentTime = now()

  const workPoolWorkersSubscription = useSubscription(api.workPoolWorkers.getWorkers, [props.workPool.name, {}], subscriptionOptions)
  const workPoolWorkers = computed(() => workPoolWorkersSubscription.response ?? [])
  const lastWorkerHeartbeat = computed(() => workPoolWorkers.value[0].lastHeartbeatTime)

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()
</script>

<style>
.work-pool-card { @apply
  grid
  gap-2
}

.work-pool-card__header { @apply
  flex
  gap-2
  items-center
  justify-between
}

.work-pool-card__name { @apply
  text-lg
}

.work-pool-card__header-actions { @apply
  flex
  gap-2
  items-center
}

.work-pool-card__description { @apply
  text-sm
}

.work-pool-card__details { @apply
  flex
  gap-8
  items-center
  text-sm
}

.work-pool-card__details-label { @apply
  font-medium
  mr-2
}

.work-pool-card__heading { @apply
  flex
  gap-2
  items-center
}
</style>
