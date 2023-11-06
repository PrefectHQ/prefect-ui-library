<template>
  <p-card class="flow-run-graph-confirmation">
    <p-icon class="flow-run-graph-confirmation__confirmation-icon" icon="ExclamationCircleIcon" />
    <h3 class="flow-run-graph-confirmation__confirmation-header">
      {{ localization.info.flowRunGraphNotDisplayedHeader }}
    </h3>
    <p class="flow-run-graph-confirmation__confirmation-message">
      {{ localization.info.flowRunGraphNotDisplayedCopy }}
    </p>
    <p-button @click="confirm">
      {{ localization.info.flowRunGraphNotDisplayedCta }}
    </p-button>
  </p-card>
</template>

<script setup lang="ts">
  import { localization } from '@/localization'

  const emit = defineEmits<{
    (event: 'confirm'): void,
  }>()

  const confirm = (): void => {
    emit('confirm')
  }
</script>

<style>
.flow-run-graph-confirmation { @apply
  h-full
  flex
  flex-col
  items-center
  justify-center
  text-center
}

.flow-run-graph-confirmation__confirmation-icon { @apply
  text-subdued
  mx-auto
  w-10
  h-10
  mb-3
}

.flow-run-graph-confirmation__confirmation-header { @apply
  text-xl
  font-semibold
  mb-2
}

.flow-run-graph-confirmation__confirmation-message { @apply
  text-subdued
  px-4
  mb-4
}
</style>