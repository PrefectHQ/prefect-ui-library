<template>
  <p-virtual-scroller :items="workPools" class="work-pools-list">
    <template #default="{ item: workPool }">
      <WorkPoolCard :work-pool="workPool" @update="emit('update')" />
    </template>
  </p-virtual-scroller>
</template>

<script lang="ts" setup>
  import { WorkPoolCard } from '@/components'
  import { WorkPool } from '@/models'

  defineProps<{
    workPools: WorkPool[],
  }>()

  const emit = defineEmits<{
    (event: 'delete' | 'update'): void,
  }>()
</script>

<style>
.work-pools-list {
  --virtual-scroller-item-gap: theme('spacing.3')
}
</style>