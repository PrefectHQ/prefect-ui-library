<template>
  <template v-if="workPool.status">
    <p-tag>
      <WorkPoolStatusIcon :work-pool="workPool" />
      {{ getWorkPoolStatusLabel(workPool.status) }}
    </p-tag>
  </template>
</template>

<script lang="ts" setup>
  import WorkPoolStatusIcon from '@/components/WorkPoolStatusIcon.vue'
  import { WorkPool, getWorkPoolStatusLabel } from '@/models'

  defineProps<{
    workPool: WorkPool,
  }>()
</script>
