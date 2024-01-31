<template>
  <div class="status-icon" :class="classes" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  export type Status = 'ready' | 'not_ready' | 'paused'

  const props = defineProps<{ status: Status }>()

  const classes = computed(() => `status-icon--${props.status.toLowerCase()}`)
</script>

<style>
.status-icon { @apply
  w-2
  h-2
  rounded-full
}

.status-icon--ready { @apply
  bg-sentiment-positive
}

.status-icon--not_ready { @apply
  bg-sentiment-negative
}
</style>