<template>
  <div class="schema-form-property">
    <component :is="is" v-model="internalValue" v-bind="{ property, propKey }" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormInput from '@/components/SchemaFormInput.vue'
  import SchemaFormProperties from '@/components/SchemaFormProperties.vue'
  import SchemaFormPropertyAllOf from '@/components/SchemaFormPropertyAllOf.vue'
  import SchemaFormPropertyAnyOf from '@/components/SchemaFormPropertyAnyOf.vue'
  import { SchemaProperty, SchemaValue, schemaHas } from '@/types/schemas'

  const props = defineProps<{
    modelValue?: SchemaValue,
    propKey: string,
    property: SchemaProperty,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SchemaValue): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? {}
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  const is = computed(() => {
    if (props.property.type === 'block') {
      return SchemaFormInput
    }

    if (schemaHas(props.property, 'properties')) {
      return SchemaFormProperties
    }

    if (schemaHas(props.property, 'allOf')) {
      return SchemaFormPropertyAllOf
    }

    if (schemaHas(props.property, 'anyOf')) {
      return SchemaFormPropertyAnyOf
    }

    return SchemaFormInput
  })
</script>

<style>
.schema-form-property__component { @apply
  pl-2
}
</style>