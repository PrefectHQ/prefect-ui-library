<template>
  <p-tag class="log-level-label" :class="classes">
    {{ label }}
  </p-tag>
</template>

<script lang="ts" setup>
  import { PTag } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { logLevelLabel } from '@/utilities/logs'
  import { snakeCase } from '@/utilities/strings'

  const props = defineProps({
    level: {
      type: Number,
      required: true,
    },
  })

  const label = computed(() => logLevelLabel(props.level))

  const classes = computed(() => {
    return `log-level-label--${snakeCase(label.value)}`
  })
</script>

<style>
:root {
  --log-level-custom:  theme('colors.sky.400');
  --log-level-info: theme('colors.sky.400');
  --log-level-debug: theme('colors.indigo.500');
  --log-level-warning: theme('colors.amber.400');
  --log-level-error:  theme('colors.rose.500');
  --log-level-critical: theme('colors.rose.700');
}

.log-level-label { @apply
  block w-min text-[10px] leading-snug text-white font-semibold uppercase px-2;
}

.log-level-label--custom,
.log-level-label--info { @apply
  !text-slate-800;
  background-color: var(--log-level-info);
}

.log-level-label--debug {
  background-color: var(--log-level-debug);
}

.log-level-label--warning {
  background-color: var(--log-level-warning);
}

.log-level-label--error {
  background-color: var(--log-level-error);
}

.log-level-label--critical {
  background-color: var(--log-level-critical);
}
</style>
