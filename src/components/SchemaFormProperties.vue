<template>
  <p-label :label="label" :description="property.description" class="schema-form-properties">
    <p-content class="schema-form-properties__fields">
      <template v-for="(prop, key) in property.properties" :key="key">
        <SchemaFormProperty v-model="internalValue[key]" :property="prop!" :prop-key="`${propKey}.${key}`" />
      </template>
    </p-content>
  </p-label>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormProperty from '@/components/SchemaFormProperty.vue'
  import { SchemaProperty, SchemaValues } from '@/types/schemas'

  const props = defineProps<{
    modelValue?: SchemaValues,
    propKey: string,
    property: SchemaProperty,
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

  const label = computed(() => props.property.meta?.required ? props.property.title : `${props.property.title} (Optional)`)
</script>

<style>
.schema-form-properties__fields { @apply
  border-background-500
  border-[1px]
  p-4
  rounded
}
</style>