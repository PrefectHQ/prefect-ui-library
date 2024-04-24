<template>
  <p-tooltip class="formatted-date">
    <template #content>
      <slot>
        <div class="formatted-date__tooltip">
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
  import { formatDateTimeRelative, formatDateTimeNumeric } from '@/utilities'

  const props = defineProps<{
    timestamp: Date | number | string,
    format?: 'relative' | 'numeric',
  }>()

  const formattedText = computed(() => {
    const normalizedDate = new Date(props.timestamp)

    if (normalizedDate.toString() === 'Invalid Date') {
      console.warn('Invalid date provided to RichTimestamp:', props.timestamp)
      return props.timestamp
    }

    if (normalizedDate.getFullYear() < 2000) {
      console.warn('Suspiciously old date provided to RichTimestamp:', props.timestamp)
      return props.timestamp
    }

    switch (props.format) {
      case 'numeric':
        return formatDateTimeNumeric(normalizedDate)
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