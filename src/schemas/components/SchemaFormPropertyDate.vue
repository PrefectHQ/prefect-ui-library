<template>
  <p-date-input v-model="value" clearable />
</template>

<script lang="ts" setup>
  import { isNotNullish } from '@prefecthq/prefect-design'
  import { format, parse, startOfToday } from 'date-fns'
  import { computed } from 'vue'
  import { isInvalidDate } from '@/utilities'

  const props = defineProps<{
    value: string | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:value': [string | null | undefined],
  }>()

  const dateFormat = 'yyyy-MM-dd'

  const value = computed({
    get() {
      if (isNotNullish(props.value)) {
        const parsed = parse(props.value, dateFormat, startOfToday())

        if (isInvalidDate(parsed)) {
          return undefined
        }

        return parsed
      }

      return props.value
    },
    set(value) {
      if (isNotNullish(value)) {
        emit('update:value', format(value, dateFormat))
        return
      }

      emit('update:value', value)
    },
  })
</script>