<template>
  <div class="schema-form-property-date-time">
    <div class="schema-form-property-date-time__input-container">
      <p-date-input v-model="value" show-time clearable class="schema-form-property-date-time__date-input" />
      <TimezoneSelect v-model="timezone" class="schema-form-property-date-time__timezone-select" hide-unset />
    </div>
    <p-code v-if="normalizedValue">
      {{ normalizedValue }}
    </p-code>
  </div>
</template>

<script lang="ts" setup>
  import { isNotNullish } from '@prefecthq/prefect-design'
  import { formatDate } from 'date-fns'
  import { computed, onBeforeMount, ref, watchEffect } from 'vue'
  import { TimezoneSelect } from '@/components'
  import { isInvalidDate } from '@/utilities'

  const props = defineProps<{
    value: string | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:value': [string | null | undefined],
  }>()

  const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'"

  // Note that this handles fractional seconds
  const TIMEZONE_REGEX = /(\.\d{1,9})?([+-]\d{2}:?\d{2}|Z)$/

  const timezone = ref<string>('UTC')
  const normalizedValue = computed(() => getNormalizedValue(props.value))

  watchEffect(() => {
    console.log('timezone', timezone.value)
  })

  onBeforeMount(() => {
    if (isNotNullish(props.value)) {
      timezone.value = getTimezoneNameFromString(props.value) ?? 'UTC'
    }
  })

  const value = computed({
    get() {
      if (isNotNullish(props.value)) {
        const replaced = getUnassignedTimezoneString(props.value)
        const parsed = new Date(replaced)

        if (isInvalidDate(parsed)) {
          return undefined
        }

        return parsed
      }

      return props.value
    },
    set(value) {
      if (isNotNullish(value)) {
        const normalized = getNormalizedValue(value)
        emit('update:value', normalized)
        return
      }

      emit('update:value', value)
    },
  })

  function getUnassignedTimezoneString(value: string): string {
    return value.replace(TIMEZONE_REGEX, '$1')
  }

  function getTimezoneNameFromString(value: string): string | null {
    const date = new Date(value)

    if (isInvalidDate(date)) {
      return null
    }

    return date.toLocaleString('en-US', { timeZoneName: 'short' }).split(' ')[3]
  }

  function getNormalizedValue(value: Date | string | null | undefined): string | null | undefined {
    if (value instanceof Date) {
      return formatDate(value, DATE_FORMAT)
    }

    if (isNotNullish(value)) {
      const unassigned = getUnassignedTimezoneString(value)
      const parsed = new Date(unassigned)

      if (isInvalidDate(parsed)) {
        return undefined
      }

      return formatDate(parsed, DATE_FORMAT)
    }

    return value
  }
</script>

<style>
.schema-form-property-date-time { @apply
  flex
  flex-col
  gap-2
}

.schema-form-property-date-time__input-container { @apply
  flex
  gap-2
}

.schema-form-property-date-time__date-input { @apply
  grow
  shrink-0
}

.schema-form-property-date-time__timezone-select { @apply
  w-1/4
  shrink-0
}
</style>