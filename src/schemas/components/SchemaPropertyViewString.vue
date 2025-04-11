<template>
  <div class="schema-property-view-string">
    {{ display }}
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'

  const { property, value } = defineProps<{
    property: SchemaProperty & { type: 'string' },
    value: string | undefined,
  }>()

  const { property: schemaProperty } = useSchemaProperty(() => property)

  const display = computed(() => {
    const { format, enum: stringEnum } = schemaProperty.value

    if (format === 'date') {
      return value ? new Date(value).toLocaleDateString() : undefined
    }

    if (format === 'date-time') {
      return value ? new Date(value).toLocaleString() : undefined
    }

    if (format === 'json-string') {
      return JSON.stringify(value, null, 2)
    }

    if (stringEnum) {
      return stringEnum.find(_e => _e === value) ?? value
    }

    return value
  })
</script>