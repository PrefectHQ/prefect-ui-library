<template>
  <p-virtual-scroller :items="workerPools" class="worker-pools-list">
    <template #default="{ item: workerPool }">
      <WorkerPoolCard :worker-pool="workerPool" @update="emit('update')" />
    </template>
  </p-virtual-scroller>
</template>

<script lang="ts" setup>
  import { WorkerPoolCard } from '@/components'
  import { WorkerPool } from '@/models'

  defineProps<{
    workerPools: WorkerPool[],
  }>()

  const emit = defineEmits<{
    (event: 'delete' | 'update'): void,
  }>()
</script>

<style>
.worker-pools-list {
  --virtual-scroller-item-gap: theme('spacing.2')
}
</style>
