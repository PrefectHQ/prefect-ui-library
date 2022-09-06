<template>
  <template v-if="isBlockDocumentProperty && typeof value === 'string'">
    <BlockDocumentKeyValue :block-document-id="value" />
  </template>
  <template v-else>
    <PKeyValue :label="property.title" :value="value" class="schema-property">
      <template v-if="value && isJsonProperty" #value>
        <JsonView :value="stringify(value)" />
      </template>
    </PKeyValue>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BlockDocumentKeyValue from './BlockDocumentKeyValue.vue'
  import { JsonInput } from '.'
  import { schemaHas, SchemaProperty, SchemaValue } from '@/types/schemas'
  import { stringify } from '@/utilities/json'

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