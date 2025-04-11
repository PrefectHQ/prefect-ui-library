<template>
  <div class="schema-property-view-number">
    {{ display?.toLocaleString() }}
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'


  const { property, value } = defineProps<{
    property: SchemaProperty & { type: 'integer' | 'number' },
    value: number | null | undefined,
  }>()

  const { property: schemaProperty } = useSchemaProperty(() => property)

  const display = computed(() => {
    if (schemaProperty.value.enum) {
      return schemaProperty.value.enum.find(_e => _e === value) ?? value
    }

    return value
  })
</script>