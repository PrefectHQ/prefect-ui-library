<template>
  <p-content class="schema-form-property-any-of">
    <h3 class="schema-form-property-any-of__section-header">
      {{ title }}
    </h3>

    <p-button-group v-model="selected" :options="options" size="sm" />

    <template v-for="(subProperty, key) in displayedDefinition.properties" :key="key">
      <SchemaFormProperty :prop-key="`${propKey}.${key}`" :property="subProperty" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import SchemaFormProperty from './SchemaFormProperty.vue'
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
    label: prop.title ?? prop.alias ?? '',
    value: index,
  })))
</script>

<style>
.schema-form-property-any-of__section-header { @apply
  text-lg
  font-semibold
}
</style>