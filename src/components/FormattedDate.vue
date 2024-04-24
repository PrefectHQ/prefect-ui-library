<template>
  <p-tooltip class="formatted-date">
    <template #content>
      <slot>
        <div class="formatted-date__tooltip">
          {{ date }}
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
  import { formatDateTimeRelative, formatDateTimeNumeric, formatDate, formatDateTime } from '@/utilities'

  const props = defineProps<{
    date: Date | string,
    format?: 'date' | 'datetime' | 'relative' | 'numeric',
  }>()

  const formattedText = computed(() => {
    const normalizedDate = new Date(props.date)

    if (normalizedDate.toString() === 'Invalid Date') {
      console.warn('Invalid date provided to FormattedDate:', props.date)
      return props.date
    }

    switch (props.format) {
      case 'numeric':
        return formatDateTimeNumeric(normalizedDate)
      case 'date':
        return formatDate(normalizedDate)
      case 'datetime':
        return formatDateTime(normalizedDate)
      case 'relative':
      default:
        return formatDateTimeRelative(normalizedDate)
    }
  })
</script>

<style>
.formatted-date { @apply
  font-mono
}

.formatted-date__tooltip { @apply
  text-xs
  font-mono
  px-1
  py-0.5
}
</style>