<template>
  <div class="schema-property-view-unknown">
    {{ display }}
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'

  const { property, value } = defineProps<{
    property: SchemaProperty & { type: undefined },
    value: unknown,
  }>()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { property: schemaProperty } = useSchemaProperty(() => property)

  const display = computed(() => {
    return JSON.stringify(value, null, 2)
  })
</script>
