<template>
  <div class="value-key-statistic" :class="classes">
    <span class="value-key-statistic__value">{{ value.toLocaleString() }}</span>
    <template v-if="isDefined(label)">
      <span class="value-key-statistic__label">{{ label.toLocaleString() }}</span>
    </template>
    <template v-if="isDefined(meta)">
      <span class="value-key-statistic__meta">{{ meta.toLocaleString() }}</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { isDefined } from '@prefecthq/prefect-design'
  import { computed } from 'vue'

  const props = defineProps<{
    value: string | number,
    label?: string,
    meta?: string,
    primary?: boolean,
  }>()

  const classes = computed(() => ({
    'value-key-statistic--primary': props.primary,
  }))
</script>

<style>
.value-key-statistic { @apply
  inline-flex
  items-end
  gap-1
  text-sm
}

.value-key-statistic--primary { @apply
  text-base
}

.value-key-statistic__value { @apply
  font-semibold
}

.value-key-statistic__meta { @apply
  text-foreground-200
}
</style>