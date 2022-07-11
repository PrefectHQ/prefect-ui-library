<template>
  <template v-for="(subProperty, key) in properties" :key="key">
    <PydanticFormProperty :property="subProperty" :level="level" />
  </template>
</template>

<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import type { PydanticPropertyRecordAllOf } from '@/types/Pydantic'

  const props = withDefaults(defineProps<{
    modelValue?: Record<string, unknown>,
    level?: number,
    property: PydanticPropertyRecordAllOf,
  }>(), {
    level: 0,
    modelValue: () => ({}),
  })


  const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  const definitions = computed(() => {
    return props.property.allOf
  })

  const properties = computed(() => {
    return definitions.value
  })
</script>

<style>
.pydantic-form-intersection-property__section-header {
  @apply text-lg font-semibold
}
</style>