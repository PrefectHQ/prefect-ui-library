<template>
  <span v-if="isNumber(count)" class="selected-count">
    {{ count }} {{ composedLabel }} Selected
  </span>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import { toPluralString, isNumber } from '@/utilities'

  const props = withDefaults(defineProps<{
    count: number | null | undefined,
    label?: string,
  }>(), {
    label: '',
  })

  const composedLabel = computed(() => {
    if (props.count && props.label !== '') {
      return toPluralString(props.label, props.count)
    }
    return ''
  })
</script>

<style>
.selected-count { @apply
  text-gray-500
  text-base
}
</style>