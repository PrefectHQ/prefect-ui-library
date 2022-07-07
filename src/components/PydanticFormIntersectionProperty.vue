<template>
  <section>
    HEllo I'm an intersection property
    <!--
      <h3 class="pydantic-form-union-property__section-header">
      {{ title }}
      </h3>

      <PydanticFormField v-model="internalValue" :definition="internalDefinition" />
    -->
  </section>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import PydanticFormField from './PydanticFormField.vue'
  import { isPydanticTypeRef, PydanticPropertyRecordAllOf, PydanticTypeDefinition, hasTypeRef } from '@/types/Pydantic'
  import { getTypeDefinitionFromTypeRef } from '@/utilities/pydanticMapper'

  const props = defineProps<{
    modelValue?: unknown,
    property: PydanticPropertyRecordAllOf,
    schema: PydanticTypeDefinition,
  }>()

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

  const internalDefinition = {}


  const title = computed(() => {
    return props.property.alias ?? props.property.title ?? props.property.$ref
  })
</script>

<style>
.pydantic-form-union-property__section-header {
  @apply text-lg font-semibold
}
</style>