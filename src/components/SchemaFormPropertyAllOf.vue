<template>
  <p-label :label="property.title" :description="property.description" class="schema-form-property-all-of">
    <template v-for="(prop, key) in property.allOf" :key="key">
      <SchemaFormProperty v-model="internalValue" :prop-key="propKey" :property="prop" />
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormProperty from '@/components/SchemaFormProperty.vue'
  import { SchemaPropertyAllOf, SchemaValues } from '@/types/schemas'

  const props = defineProps<{
    modelValue?: SchemaValues,
    propKey: string,
    property: SchemaPropertyAllOf,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SchemaValues): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? {}
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })
</script>