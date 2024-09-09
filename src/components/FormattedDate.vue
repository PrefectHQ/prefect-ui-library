<template>
  <p-tooltip avoid-collisions>
    <template #content>
      <slot name="tooltip">
        <div class="formatted-date__tooltip">
          {{ date }}
        </div>
      </slot>
    </template>

    <button type="button" class="formatted-date">
      <slot v-bind="{ date: formattedText }">
        {{ formattedText }}
      </slot>
    </button>
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { useNow } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { formatDateTimeRelative, formatDateTimeNumeric, formatDate, formatDateTime } from '@/utilities'

  const props = defineProps<{
    date: Date,
    format?: 'date' | 'datetime' | 'relative' | 'numeric',
  }>()

  const { now } = useNow({ interval: 60_000 })

  const formattedText = computed(() => {
    switch (props.format) {
      case 'numeric':
        return formatDateTimeNumeric(props.date)
      case 'date':
        return formatDate(props.date)
      case 'datetime':
        return formatDateTime(props.date)
      case 'relative':
      default:
        return formatDateTimeRelative(props.date, now.value)
    }
  })
</script>

<style>
.formatted-date { @apply
  text-left
  font-mono;
  /* mono font is smaller than the sans font. This bumps whatever the font is by 2px so it matches  */
  font-size: calc(1em + 2px)
}

.formatted-date__tooltip { @apply
  text-xs
  font-mono
  px-1
  py-0.5
}
</style>