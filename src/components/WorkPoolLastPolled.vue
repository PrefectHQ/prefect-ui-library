<template>
  <span class="work-pool-last-polled">
    <template v-if="lastPolled">
      {{ lastPolled }}
    </template>
    <template v-else>
      <span class="work-pool-last-polled__no-poll">N/A</span>
    </template>
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useInterval, useWorkPoolLastPolled } from '@/compositions'
  import { WorkPool } from '@/models'

  const props = defineProps<{
    workPool: WorkPool,
  }>()

  const options = useInterval()
  const workPoolName = computed(() => props.workPool.name)
  const { lastPolled } = useWorkPoolLastPolled(workPoolName, options)
</script>

<style>
.work-pool-last-polled__no-poll { @apply
  text-slate-500
}
</style>