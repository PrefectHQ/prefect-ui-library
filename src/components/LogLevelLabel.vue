<template>
  <p-tag class="log-level-label" :class="classes">
    {{ label }}
  </p-tag>
</template>

<script lang="ts" setup>
  import { PTag } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { LogLevel } from '@/models/Log'
  import { logLevelLabel } from '@/utilities/logs'
  import { snakeCase } from '@/utilities/strings'

  const props = defineProps<{
    level: LogLevel,
  }>()

  const label = computed(() => logLevelLabel(props.level))

  const classes = computed(() => {
    return `log-level-label--${snakeCase(label.value)}`
  })
</script>

<style>
.log-level-label { @apply
  block
  w-min
  text-[10px]
  leading-snug
  font-semibold
  uppercase
  font-sans
  px-2;
}

.log-level-label--custom { @apply
  bg-[var(--p-color-log-custom-bg)]
  text-[var(--p-color-log-custom-text)]
}

.log-level-label--info { @apply
  bg-[var(--p-color-log-info-bg)]
  text-[var(--p-color-log-info-text)]
}

.log-level-label--debug { @apply
  bg-[var(--p-color-log-debug-bg)]
  text-[var(--p-color-log-debug-text)]
}

.log-level-label--warning { @apply
  bg-[var(--p-color-log-warning-bg)]
  text-[var(--p-color-log-warning-text)]
}

.log-level-label--error { @apply
  bg-[var(--p-color-log-error-bg)]
  text-[var(--p-color-log-error-text)]
}

.log-level-label--critical { @apply
  bg-[var(--p-color-log-critical-bg)]
  text-[var(--p-color-log-critical-text)]
}
</style>
