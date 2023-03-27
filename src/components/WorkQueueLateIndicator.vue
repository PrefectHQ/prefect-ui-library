<template>
  <p-tag v-if="lateRunsCount" class="work-queue-late-indicator">
    {{ lateRunsCount }} {{ toPluralString('Late run', lateRunsCount) }}
  </p-tag>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useWorkQueueStatus } from '@/compositions'
  import { toPluralString } from '@/utilities'

  const props = defineProps<{
    workQueueId: string,
  }>()

  const workQueueId = computed(() => props.workQueueId)
  const { workQueueStatus } = useWorkQueueStatus(workQueueId)
  const lateRunsCount = computed(() => workQueueStatus.value?.lateRunsCount)
</script>

<style>
.work-queue-late-indicator { @apply
  text-xs
  bg-amber-100
  text-amber-800
  dark:bg-amber-700
  dark:text-white
}
</style>