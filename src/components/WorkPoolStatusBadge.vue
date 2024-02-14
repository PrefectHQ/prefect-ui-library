<template>
  <template v-if="workPool.status">
    <p-tag>
      <WorkPoolStatusIcon :work-pool="workPool" />
      {{ titleCase(workPool.status) }}
    </p-tag>
  </template>
</template>

<script lang="ts" setup>
  import WorkPoolStatusIcon from '@/components/WorkPoolStatusIcon.vue'
  import { WorkPool } from '@/models'
  import { titleCase } from '@/utilities'

  defineProps<{
    workPool: WorkPool,
  }>()
</script>
