<template>
  <p-date-input v-model="value" show-time clearable />
</template>

<script lang="ts" setup>
  import { isNotNullish } from '@prefecthq/prefect-design'
  import { formatISO, parseISO } from 'date-fns'
  import { computed } from 'vue'
  import { isInvalidDate } from '@/utilities'

  const props = defineProps<{
    value: string | null,
  }>()

  const emit = defineEmits<{
    'update:value': [string | null],
  }>()

  const value = computed({
    get() {
      if (isNotNullish(props.value)) {
        const parsed = parseISO(props.value)

        if (isInvalidDate(parsed)) {
          return null
        }

        return parsed
      }

      return props.value
    },
    set(value) {
      if (isNotNullish(value)) {
        emit('update:value', formatISO(value))
        return
      }

      emit('update:value', value)
    },
  })
</script>