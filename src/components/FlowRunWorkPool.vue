<template>
  <div class="flow-run-work-pool">
    <span>Work Pool</span> <WorkPoolIconText :work-pool-name="workPoolName" />
  </div>
</template>

<script lang="ts" setup>
  import WorkPoolIconText from '@/components/WorkPoolIconText.vue'

  defineProps<{
    workPoolName: string,
  }>()
</script>

<style>
.flow-run-work-pool { @apply
  flex gap-1
}
</style>