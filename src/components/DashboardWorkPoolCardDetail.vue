<template>
  <div class="dashboard-work-pool-card-detail">
    <dt class="dashboard-work-pool-card-detail__label">
      {{ label }}
    </dt>
    <dd class="dashboard-work-pool-card-detail__value">
      <slot />
    </dd>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    label: string,
  }>()
</script>

<style>
.dashboard-work-pool-card-detail { @apply
  text-center
  max-w-full
}

.dashboard-work-pool-card-detail__label { @apply
  text-xs
  text-slate-500
}
</style>
