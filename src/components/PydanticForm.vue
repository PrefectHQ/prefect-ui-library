<template>
  <p-form @submit="submit">
    <p-content>
      <template v-for="(property, key) in properties" :key="key">
        <PydanticFormProperty :prop-key="key" :property="property" />
      </template>
    </p-content>

    <template v-if="!hideFooter" #footer>
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

  type PydanticFormValue = Record<string, unknown>
  const props = defineProps<{
    modelValue?: PydanticFormValue,
    pydanticSchema: PydanticTypeDefinition,
    hideFooter?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue' | 'submit', value?: PydanticFormValue): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  const { handleSubmit, values } = useReactiveForm(internalValue)
  const submit = handleSubmit(() => emit('submit', values))

  const properties = computed(() => resolvePydanticTypeDefinitionFromSchema(props.pydanticSchema))
</script>
