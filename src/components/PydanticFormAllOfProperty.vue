<template>
  <PydanticFormProperty :prop-key="propKey" :property="property" :level="level" />
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import { SchemaPropertyAllOf } from '@/types/schemas'

  const props = withDefaults(defineProps<{
    level?: number,
    propKey: string,
    property: SchemaPropertyAllOf,
  }>(), {
    level: 0,
  })

  const property = computed(() => {
    const { allOf, ...rest } = props.property
    // This is to make sure we're passing the sum of all properties of the type
    // while unwrapping the allOf property and bypassing another level of recursion from PydanticFormProperty
    // ☠️☠️ DANGER PERIGO 危险 NEBEZPEČÍ OPASNOST 위험 GEVAAR خطر ACHTUNG ΚΊΝΔΥΝΟΣ 危険 АЮУЛ FARE ☠️☠️
    // Removing this line will cause a stack overflow since the component
    // will never exit recursion
    // ☠️☠️ DANGER PERIGO 危险 NEBEZPEČÍ OPASNOST 위험 GEVAAR خطر ACHTUNG ΚΊΝΔΥΝΟΣ 危険 АЮУЛ FARE ☠️☠️
    return { ...allOf[0], ...rest }
  })
</script>