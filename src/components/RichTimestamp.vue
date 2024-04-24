<template>
  <p-tooltip class="rich-timestamp">
    <template #content>
      <slot>
        <div class="rich-timestamp__tooltip">
          {{ timestamp }}
        </div>
      </slot>
    </template>

    <slot name="text" v-bind="{ formattedText }">
      {{ formattedText }}
    </slot>
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { formatDateTimeRelative, secondsToApproximateString, isDate, isNumber, formatDateTimeNumeric } from '@/utilities'

  const props = defineProps<{
    timestamp?: Date | number | null | undefined | string,
    format?: 'relative' | 'approximate' | 'numeric',
  }>()

  const formattedText = computed(() => {
    if (isDate(props.timestamp)) {
      switch (props.format) {
        case 'numeric':
          return formatDateTimeNumeric(props.timestamp)
        case 'approximate':
        case 'relative':
        default:
          return formatDateTimeRelative(props.timestamp)
      }
    }

    if (isNumber(props.timestamp)) {
      switch (props.format) {
        case 'relative':
          return formatDateTimeRelative(new Date(props.timestamp))
        case 'numeric':
          return formatDateTimeNumeric(new Date(props.timestamp))
        case 'approximate':
        default:
          return secondsToApproximateString(props.timestamp)
      }
    }

    return props.timestamp
  })
</script>

<style>
.rich-timestamp { @apply
  font-mono
}

.rich-timestamp__tooltip { @apply
  text-xs
  font-mono
  px-1
  py-0.5
}
</style>