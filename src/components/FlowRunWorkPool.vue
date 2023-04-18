<template>
  <div class="flow-run-list-item__relation">
    <span>Work Pool</span> <WorkPoolIconText :work-pool-name="workPoolName" />
  </div>
</template>

<script lang="ts" setup>
  import WorkPoolIconText from '@/components/WorkPoolIconText.vue'

  defineProps<{
    workPoolName: string,
  }>()
</script>
