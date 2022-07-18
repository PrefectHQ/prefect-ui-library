<template>
  <p-form @submit="handleSubmit">
    <p-content>
      <template v-for="(property, key) in properties" :key="key">
        <PydanticFormProperty :prop-key="key" :property="property" />
      </template>
    </p-content>

    <template #footer>
      <p-button type="submit">
        Save
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import { useReactiveForm } from '@/compositions'
  import { PydanticTypeDefinition } from '@/types/Pydantic'
  import { resolvePydanticTypeDefinitionFromSchema } from '@/utilities'

  const props = defineProps<{
    modelValue?: Record<string, unknown>,
    pydanticSchema: PydanticTypeDefinition,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value?: Record<string, unknown>): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  const { handleSubmit } = useReactiveForm(internalValue)

  const properties = computed(() => resolvePydanticTypeDefinitionFromSchema(props.pydanticSchema))
</script>
