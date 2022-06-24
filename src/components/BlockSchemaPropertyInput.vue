<template>
  <p-label class="block-schema-property-input" :label="property.title" :message="property.description" :class="classes" :style="styles">
    <component :is="input" v-model="model" v-bind="{ ...attrs, ...inputProps }" />
  </p-label>
</template>

<script lang="ts" setup>
  import { PCombobox, PNumberInput, PSelect, PTextInput, PToggle, useAttrsStylesAndClasses } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { BlockSchemaSimpleProperty } from '@/models/BlockSchema'

  const props = defineProps<{
    property: BlockSchemaSimpleProperty,
    value: unknown,
  }>()

  const emit = defineEmits<{
    (event: 'update:value', value: unknown): void,
  }>()

  const { classes, styles, attrs } = useAttrsStylesAndClasses()

  const model = computed({
    get(): unknown {
      return props.value
    },
    set(value: unknown): void {
      emit('update:value', value)
    },
  })

  const input = computed(() => {
    if (props.property.enum) {
      return PSelect
    }

    switch (props.property.type) {
      case 'string':
        return PTextInput
      case 'number':
      case 'integer':
        return PNumberInput
      case 'boolean':
        return PToggle
      case 'array':
        return PCombobox
      default:
        return PTextInput
    }
  })

  const inputProps = computed(() => {
    const value: Record<string, unknown> = {}

    if (props.property.enum) {
      value.options = props.property.enum
    }

    if (props.property.type === 'array') {
      value.multiple = true
    }

    return value
  })
</script>