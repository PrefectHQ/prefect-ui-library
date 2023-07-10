<template>
  <template v-if="isBlockDocumentValue(value)">
    <SchemaPropertyBlockKeyValue v-bind="{ property, value }" />
  </template>
  <!-- todo: support displaying nested objects -->
  <template v-else>
    <p-key-value :label="property.title" class="schema-property-key-value" v-bind="{ value, alternate }">
      <template v-if="isDefined && isJsonProperty" #value>
        <CopyableWrapper :text-to-copy="jsonValue">
          <p-code-highlight lang="json" :text="jsonValue" />
        </CopyableWrapper>
      </template>
    </p-key-value>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import CopyableWrapper from '@/components/CopyableWrapper.vue'
  import JsonInput from '@/components/JsonInput.vue'
  import SchemaPropertyBlockKeyValue from '@/components/SchemaPropertyBlockKeyValue.vue'
  import { isBlockDocumentValue } from '@/models'
  import { SchemaProperty, SchemaValue } from '@/types/schemas'
  import { stringifyUnknownJson } from '@/utilities/stringifyUnknownJson'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
    alternate?: boolean,
  }>()

  const isJsonProperty = computed(() => {
    return props.property.type === 'array' || props.property.meta?.component === JsonInput
  })

  const jsonValue = computed(() => stringifyUnknownJson(props.value) ?? '')

  // todo: copied from PKeyValue. Hoping to update PKeyValue to eliminate the need for this
  const isDefined = computed((): boolean => {
    if (typeof props.value === 'object' && props.value !== null) {
      if (Array.isArray(props.value)) {
        return props.value.length > 0
      }

      return Object.keys(props.value).length > 0
    }

    return typeof props.value !== 'undefined' && props.value !== null && props.value !== ''
  })
</script>

<style>
.schema-property-key-value { @apply
  max-w-full
  min-w-0
  items-stretch
}
</style>