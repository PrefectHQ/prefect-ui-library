<template>
  <p-form>
    <JsonView class="tmp" :value="JSON.stringify(schema)" />

    <p-content>
      <template v-for="(property, key) in properties" :key="key">
        <PydanticFormProperty v-model="internalValue" :prop-key="key" :property="property" />
      </template>
    </p-content>

    <template #footer>
      <p-button type="submit" :disabled="isSubmitting">
        Save
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useForm } from 'vee-validate'
  import { computed, onMounted } from 'vue'
  import JsonView from './JsonView.vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import { PydanticTypeDefinition } from '@/types/Pydantic'
  import { PydanticSchema } from '@/utilities'

  const props = defineProps<{
    modelValue?: Record<string, unknown>,
    pydanticSchema: PydanticTypeDefinition,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value?: Record<string, unknown>): void,
  }>()

  const { handleSubmit, handleReset, isSubmitting, meta, errors, submitCount } = useForm()

  const properties = computed(() => {
    return schema.value.properties
  })

  const schema = computed(() => {
    return new PydanticSchema(props.pydanticSchema)
  })

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  handleSubmit((values) => console.log(values))

  onMounted(() => {
    console.log(schema.value)
  })
</script>

<style>
.tmp {
  max-height: 300px;
  overflow: auto;
}
</style>