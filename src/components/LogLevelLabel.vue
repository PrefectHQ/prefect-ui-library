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
  text-white
  font-semibold
  uppercase
  font-sans
  px-2;
}

.log-level-label--custom { @apply
  bg-slate-500
  dark:bg-slate-500
}

.log-level-label--info { @apply
  bg-[var(--log-level-info)]
  dark:bg-[var(--log-level-info)]
}

.log-level-label--debug { @apply
  bg-[var(--log-level-debug)]
  dark:bg-[var(--log-level-debug)]
}

.log-level-label--warning { @apply
  bg-[var(--log-level-warning)]
  dark:bg-[var(--log-level-warning)]
}

.log-level-label--error { @apply
  bg-[var(--log-level-error)]
  dark:bg-[var(--log-level-error)]
}

.log-level-label--critical { @apply
  bg-[var(--log-level-critical)]
  dark:bg-[var(--log-level-critical)]
}
</style>
