<template>
  <div class="dashboard-statistic">
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

  defineProps<{
    value: string | number,
    label?: string,
    meta?: string,
  }>()
</script>

<style>
.dashboard-statistic { @apply
  inline-flex
  items-end
  gap-1
  text-sm
}

.dashboard-statistic__value { @apply
  font-semibold
}

.dashboard-statistic__meta { @apply
  text-slate-500
}
</style>