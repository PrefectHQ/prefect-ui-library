<template>
  <p-content>
    <h3 class="pydantic-form-union-property__section-header">
      <span>{{ property.title ?? fieldLabel }}</span>
      <p-button-group v-model="definition" :options="buttonGroupOptions" size="sm" />
    </h3>

    <template v-for="(subProperty, key) in displayedDefinition.properties" :key="key">
      <PydanticFormProperty :prop-key="`${propKey}.${key}`" :property="subProperty" :level="level" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, ref, withDefaults } from 'vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import { SchemaPropertyAnyOf } from '@/types/schemas'

  const props = withDefaults(defineProps<{
    level?: number,
    propKey: string,
    property: SchemaPropertyAnyOf,
  }>(), {
    level: 0,
  })

  const displayedDefinition = computed(() => definitions.value[definition.value] ?? {})

  const definitions = computed(() => {
    return props.property.anyOf
  })

  const fieldLabel = computed(() => {
    return props.propKey.split('.').pop()
  })

  const buttonGroupOptions = computed<ButtonGroupOption[]>(() => {
    return definitions.value.map((prop, index) => {
      const option: ButtonGroupOption = {
        label: prop.title ?? prop.alias ?? '',
        value: index,
      }

      return option
    })
  })

  const definition = ref(0)
</script>

<style>
.pydantic-form-union-property__section-header {
  @apply
  text-lg
  font-semibold
  flex
  gap-2
}
</style>