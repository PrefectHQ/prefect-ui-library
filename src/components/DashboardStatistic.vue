<template>
  <div class="dashboard-statistic" :class="classes">
    <span class="dashboard-statistic__value">{{ value.toLocaleString() }}</span>
    <template v-if="isDefined(label)">
      <span class="dashboard-statistic__label">{{ label.toLocaleString() }}</span>
    </template>
    <template v-if="isDefined(meta)">
      <span class="dashboard-statistic__meta">{{ meta.toLocaleString() }}</span>
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
    'dashboard-statistic--primary': props.primary,
  }))
</script>

<style>
.dashboard-statistic { @apply
  inline-flex
  items-end
  gap-1
  text-sm
}

.dashboard-statistic--primary { @apply
  text-base
}

.dashboard-statistic__value { @apply
  font-semibold
}

.dashboard-statistic__meta { @apply
  text-slate-500
}
</style>