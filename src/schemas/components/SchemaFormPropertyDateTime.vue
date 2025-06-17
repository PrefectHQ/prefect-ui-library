<template>
  <div class="schema-form-property-date-time">
    <p-date-input v-model="value" show-time clearable />
    <p-code v-if="normalizedValue">
      {{ normalizedValue }}
    </p-code>
  </div>
</template>

<script lang="ts" setup>
  import { isNotNullish } from '@prefecthq/prefect-design'
  import { formatDate } from 'date-fns'
  import { computed } from 'vue'
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

  const normalizedValue = computed(() => getNormalizedValue(props.value))

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