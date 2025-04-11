<template>
  <component :is="element" class="schema-property-view-object">
    <SchemaPropertyViewProperties :properties="property.properties ?? {}" :parent="property" :values />
  </component>
</template>

<script lang="ts" setup>
  import { computed, inject, provide } from 'vue'
  import SchemaPropertyViewProperties from '@/schemas/components/SchemaPropertyViewProperties.vue'
  import { schemaPropertyObjectDepthSymbol } from '@/schemas/symbols'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { SchemaValues } from '@/schemas/types/schemaValues'

  const { property, values } = defineProps<{
    property: SchemaProperty & { type: 'object' },
    values: SchemaValues | undefined,
  }>()

  const depth = inject(schemaPropertyObjectDepthSymbol, 0)

  provide(schemaPropertyObjectDepthSymbol, depth + 1)


  const element = computed(() => {
    if (depth === 0) {
      return 'div'
    }

    return 'p-card'
  })
</script>