<template>
  <template v-if="status">
    <div class="worker-status-icon" :class="classes" />
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { WorkPoolWorkerStatus } from '@/models'

  const props = defineProps<{
    status: WorkPoolWorkerStatus,
  }>()

  const classes = computed(() => `worker-status-icon--${props.status.toLowerCase()}`)
</script>

<style>
.worker-status-icon { @apply
  flex
  items-center
  cursor-help
  w-2
  h-2
  align-middle
  text-inverse
  dark:text-default
  rounded-full
}

.worker-status-icon--online { @apply
  bg-sentiment-positive
}

.worker-status-icon--offline { @apply
  bg-sentiment-negative
}
</style>