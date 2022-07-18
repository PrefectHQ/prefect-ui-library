<template>
  <p-form @submit="submit">
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
  import { PydanticSchema  } from '@/models'
  import { PydanticTypeDefinition } from '@/types/Pydantic'

  const props = defineProps<{
    modelValue?: Record<string, unknown>,
    pydanticSchema: PydanticTypeDefinition,
  }>()

  // TODO: If we want to use a modelValue we might need to add a new
  // composition to wrap useForm
  const emit = defineEmits<{
    (event: 'update:modelValue', value?: Record<string, unknown>): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      console.log('internalValue PydanticForm running')
      emit('update:modelValue', val)
    },
  })

  const { handleSubmit } = useReactiveForm(internalValue)

  const properties = computed(() => {
    return schema.value.properties
  })

  const schema = computed(() => new PydanticSchema(props.pydanticSchema))

  const submit = handleSubmit(values => console.log(values))
</script>
