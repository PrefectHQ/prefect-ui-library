<template>
  <PydanticFormProperty :prop-key="propKey" :property="property" :level="level" />
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import type { PydanticPropertyRecordAllOf, PydanticTypeProperty } from '@/types/Pydantic'

  const props = withDefaults(defineProps<{
    level?: number,
    propKey: string,
    property: PydanticPropertyRecordAllOf,
  }>(), {
    level: 0,
    modelValue: () => ({}),
  })

  const property = computed(() => {
    const _property = { ...props.property } as PydanticTypeProperty
    // This is to make sure we're passing the sum of all properties of the type
    // while unwrapping the allOf property and bypassing another level of recursion from PydanticFormProperty
    // ☠️☠️ DANGER PERIGO 危险 NEBEZPEČÍ OPASNOST 위험 GEVAAR خطر ACHTUNG ΚΊΝΔΥΝΟΣ 危険 АЮУЛ FARE ☠️☠️
    // Removing this line will cause a stack overflow since the component
    // will never exit recursion
    // ☠️☠️ DANGER PERIGO 危险 NEBEZPEČÍ OPASNOST 위험 GEVAAR خطر ACHTUNG ΚΊΝΔΥΝΟΣ 危険 АЮУЛ FARE ☠️☠️
    delete _property.allOf
    return { ...props.property.allOf[0], ..._property }
  })
</script>