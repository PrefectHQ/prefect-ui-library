<template>
  <p-content class="schema-form-property-any-of">
    <h3 class="schema-form-property-any-of__section-header">
      {{ title }}
    </h3>

    <p-button-group v-model="selected" :options="options" size="sm" />

    <SchemaFormProperties :property="displayedDefinition" :prop-key="propKey" />
  </p-content>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import SchemaFormProperties from './SchemaFormProperties.vue'
  import { SchemaPropertyAnyOf } from '@/types/schemas'

  const props = defineProps<{
    propKey: string,
    property: SchemaPropertyAnyOf,
  }>()

  const selected = ref(0)
  const definitions = computed(() => props.property.anyOf)
  const displayedDefinition = computed(() => definitions.value[selected.value] ?? {})
  const title = computed(() => props.property.title ?? props.propKey.split('.').pop())

  const options = computed<ButtonGroupOption[]>(() => definitions.value.map((prop, index) => ({
    label: prop.title ?? prop.alias ?? prop.format ?? prop.type ?? '',
    value: index,
  })))
</script>

<style>
.schema-form-property-any-of__section-header { @apply
  text-lg
  font-semibold
}
</style>