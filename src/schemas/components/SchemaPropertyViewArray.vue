<template>
  <p-tag-area class="schema-property-view-array" :tags="display" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'


  const { property, value } = defineProps<{
    property: SchemaProperty & { type: 'array' },
    value: unknown[],
  }>()

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { property: schemaProperty } = useSchemaProperty(() => property)

  const display = computed(() => {
    return value.map(_v => _v?.toString())
  })
</script>