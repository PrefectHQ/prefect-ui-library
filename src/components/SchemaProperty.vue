<template>
  <template v-if="isBlockDocumentProperty && typeof value === 'string'">
    <BlockDocumentKeyValue :block-document-id="value" />
  </template>
  <template v-else>
    <PKeyValue :label="property.title" :value="value" class="schema-property">
      <template v-if="value && isJsonProperty" #value>
        <!-- eslint-disable-next-line vue/no-extra-parens -->
        <JsonView :value="(value as string)" />
      </template>
    </PKeyValue>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BlockDocumentKeyValue from './BlockDocumentKeyValue.vue'
  import { JsonView, JsonInput } from '.'
  import { schemaHas, SchemaProperty, SchemaValue } from '@/types/schemas'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
  }>()

  const isJsonProperty = computed(() => {
    if (schemaHas(props.property, 'meta')) {
      return props.property.meta.component === JsonInput
    }

    return false
  })

  const isBlockDocumentProperty = computed(() => {
    return schemaHas(props.property, 'blockReference')
  })
</script>