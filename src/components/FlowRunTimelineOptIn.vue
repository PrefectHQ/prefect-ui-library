<template>
  <div class="flow-run-timeline-opt-in">
    <div class="flow-run-timeline-opt-in__confirmation">
      <p-icon class="flow-run-timeline-opt-in__confirmation-icon" icon="ExclamationCircleIcon" />
      <h3 class="flow-run-timeline-opt-in__confirmation-header">
        {{ localization.info.flowRunGraphNotDisplayedHeader }}
      </h3>
      <p class="flow-run-timeline-opt-in__confirmation-message">
        {{ localization.info.flowRunGraphNotDisplayedCopy }}
      </p>
      <p-button @click="confirm">
        {{ localization.info.flowRunGraphNotDisplayedCta }}
      </p-button>
    </div>
  </div>
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
.flow-run-timeline-opt-in { @apply
  h-full
  flex
  items-center
  justify-center
}

.flow-run-timeline-opt-in__confirmation { @apply
  text-center
}

.flow-run-timeline-opt-in__confirmation-icon { @apply
  text-subdued
  mx-auto
  w-10
  h-10
  mb-3
}

.flow-run-timeline-opt-in__confirmation-header { @apply
  text-xl
  font-semibold
  mb-2
}

.flow-run-timeline-opt-in__confirmation-message { @apply
  text-subdued
  px-4
  mb-4
}
</style>