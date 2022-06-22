<template>
  <p-label class="block-schema-property-input" :label="property.title" :message="property.description">
    <component :is="input" v-model="model" v-bind="attrs" />
  </p-label>
</template>

<script lang="ts" setup>
  import { PTextInput } from '@prefecthq/prefect-design'
  import { computed, useAttrs } from 'vue'
  import { BlockSchemaSimpleProperty } from '@/models/BlockSchema'

  const props = defineProps<{
    property: BlockSchemaSimpleProperty,
    value: unknown,
  }>()

  const emit = defineEmits<{
    (event: 'update:value', value: unknown): void,
  }>()

  const attrs = useAttrs()

  const model = computed({
    get(): unknown {
      return props.value
    },
    set(value: unknown): void {
      emit('update:value', value)
    },
  })

  const input = computed(() => {
    // todo: check for anyOf or oneOf
    // https://swagger.io/docs/specification/data-models/oneof-anyof-allof-not/
    switch (props.property.type) {
      case 'string':
        return PTextInput
      default:
        return PTextInput
    }
  })
</script>