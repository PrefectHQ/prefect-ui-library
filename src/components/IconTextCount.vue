<template>
  <p-icon-text :icon="icon" class="icon-text-count">
    <template v-if="count > 0">
      {{ count }} {{ formattedLabel }}
    </template>
    <template v-else>
      None
    </template>
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { Icon } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { toPluralString } from '@/utilities'

  const props = defineProps<{
    count: number,
    label?: string,
    icon: Icon,
  }>()

  const formattedLabel = computed(() => props.label ? toPluralString(props.label, props.count) : '')
</script>