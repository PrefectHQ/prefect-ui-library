<template>
  <div class="statistic-key-value" :class="classes">
    <span class="statistic-key-value__value">{{ value.toLocaleString() }}</span>
    <template v-if="isDefined(label)">
      <span class="statistic-key-value__label">{{ label.toLocaleString() }}</span>
    </template>
    <template v-if="isDefined(meta)">
      <span class="statistic-key-value__meta">{{ meta.toLocaleString() }}</span>
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
    'statistic-key-value--primary': props.primary,
  }))
</script>

<style>
.statistic-key-value { @apply
  inline-flex
  items-end
  gap-1
  text-sm
}

.statistic-key-value--primary { @apply
  text-base
}

.statistic-key-value__value { @apply
  font-semibold
}

.statistic-key-value__meta { @apply
  text-foreground-200
}
</style>