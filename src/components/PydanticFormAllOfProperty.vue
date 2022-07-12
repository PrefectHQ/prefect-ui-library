<template>
  <PydanticFormProperty :prop-key="propKey" :property="property" :level="level" />
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import type { PydanticPropertyRecordAllOf } from '@/types/Pydantic'

  const props = withDefaults(defineProps<{
    level?: number,
    propKey: string,
    property: PydanticPropertyRecordAllOf,
  }>(), {
    level: 0,
    modelValue: () => ({}),
  })

  const property = computed(() => {
    return props.property.allOf[0]
  })
</script>