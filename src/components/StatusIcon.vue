<template>
  <div class="status-icon" :class="`status-icon--${status}`" />
</template>

<script setup lang="ts">
  export type Status = 'ready' | 'not_ready' | 'disabled'

  defineProps<{ status: Status }>()
</script>

<style>
.status-icon { @apply
  w-2
  h-2
  rounded-full
}

.status-icon--ready { @apply
  bg-sentiment-positive
  animate-pulse
}

.status-icon--not_ready { @apply
  bg-sentiment-negative
}

.status-icon--disabled { @apply
  bg-sentiment-neutral
}
</style>