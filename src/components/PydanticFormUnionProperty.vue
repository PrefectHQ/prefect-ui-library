<template>
  <p-content>
    <h3 class="pydantic-form-union-property__section-header">
      <span>{{ property.title }}</span>
      <p-button-group v-model="definition" :options="buttonGroupOptions" size="sm" />
    </h3>

    <template v-if="displayedDefinition?.properties">
      <template v-for="(subProperty, key) in displayedDefinition.properties" :key="key">
        <PydanticFormProperty :property="subProperty" :level="level" />
      </template>
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { computed, ref, withDefaults } from 'vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import type { PydanticPropertyRecordAnyOf } from '@/types/Pydantic'

  const props = withDefaults(defineProps<{
    modelValue?: Record<string, unknown>,
    level?: number,
    property: PydanticPropertyRecordAnyOf,
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

  const displayedDefinition = computed(() => {
    return definitions.value[definition.value]
  })

  const definitions = computed(() => {
    return props.property.anyOf
  })

  const buttonGroupOptions = computed<ButtonGroupOption[]>(() => {
    return definitions.value.map((prop, index) => {
      const option: ButtonGroupOption = {
        label: prop.title ?? prop.alias ?? prop.$ref ?? '',
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