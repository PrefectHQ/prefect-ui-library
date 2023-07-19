<template>
  <p-card class="work-pool-card">
    <div class="work-pool-card__header">
      <div class="work-pool-card__heading">
        <p-link class="work-pool-card__name" :to="routes.workPool(workPool.name)">
          {{ workPool.name }}
        </p-link>
        <ProcessTypeBadge :type-label="workPool.typeLabel" />
        <WorkersLateIndicator v-if="!media.sm" :work-pool-name="workPool.name" />
      </div>

      <div class="work-pool-card__header-actions">
        <WorkersLateIndicator v-if="media.sm" :work-pool-name="workPool.name" />
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


      <div v-if="lastPolled">
        <span class="work-pool-card__details-label">Last Polled</span>
        {{ lastPolled }}
      </div>
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { WorkPoolMenu, WorkPoolToggle, WorkersLateIndicator, ProcessTypeBadge } from '@/components'
  import { useWorkPoolLastPolled, useWorkspaceRoutes } from '@/compositions'
  import { WorkPool } from '@/models'

  const props = defineProps<{
    workPool: WorkPool,
  }>()

  const routes = useWorkspaceRoutes()

  const subscriptionOptions = {
    interval: 30000,
  }
  const workPoolName = computed(() => props.workPool.name)

  const { lastPolled } = useWorkPoolLastPolled(workPoolName, subscriptionOptions)

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
  flex-col
  gap-2
  items-start
}
</style>
