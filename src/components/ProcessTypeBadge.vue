<template>
  <p-tag class="process-type-badge">
    <p-icon icon="CogIcon" />
    <span>{{ mapProcessTypeValueToProcessTypeLabel(type) }}</span>
  </p-tag>
</template>

<script lang="ts" setup>
  defineProps<{
    type: string,
  }>()

  // Expand this mapper as more process types are added
  const mapProcessTypeValueToProcessTypeLabel = (processType: string): string => {
    switch (processType) {
      case 'prefect-agent':
        return 'Prefect Agent'
      default:
        return 'Unknown'
    }
  }
</script>

<style>
.process-type-badge { @apply
  text-xs
  pl-2
  bg-slate-300
  text-slate-700
}
</style>