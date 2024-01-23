<template>
  <p-form class="block-schema-create-form" @submit="submit">
    <p-content>
      <p-label label="Block Name" :message="nameError" :state="nameState">
        <p-text-input v-model="name" :state="nameState" />
      </p-label>

      <SchemaFormFields :schema="blockSchema.fields" property="data" />
    </p-content>

    <template v-if="!hideFooter" #footer>
      <p-button @click="cancel">
        Cancel
      </p-button>
      <SubmitButton action="Create" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useSessionStorage } from '@prefecthq/vue-compositions'
  import { useField } from 'vee-validate'
  import { computed, watchEffect } from 'vue'
  import { ValidationMethodFactory, useWorkspaceApi } from '..'
  import SchemaFormFields from '@/components/SchemaFormFields.vue'
  import SubmitButton from '@/components/SubmitButton.vue'
  import { useForm } from '@/compositions/useForm'
  import { BlockDocumentCreateNamed } from '@/models/BlockDocumentCreate'
  import { BlockSchema } from '@/models/BlockSchema'
  import { getSchemaDefaultValues } from '@/services/schemas/utilities'
  import { getCacheKey } from '@/utilities/cache'
  import { fieldRules, isHandle, isRequired } from '@/utilities/validation'

  const props = defineProps<{
    blockSchema: BlockSchema,
    hideFooter?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'submit', value: BlockDocumentCreateNamed): void,
    (event: 'cancel'): void,
  }>()

  const api = useWorkspaceApi()
  const storageKey = computed(() => getCacheKey(`block-schema-form-${props.blockSchema.id}`))

  const { initialValue: initialValues, remove: removeFromStorage, set: setStorageValue } = useSessionStorage(storageKey.value, {
    name: '',
    data: getSchemaDefaultValues(props.blockSchema.fields),
    blockSchema: props.blockSchema,
  })

  const { values, handleSubmit } = useForm<BlockDocumentCreateNamed>({
    initialValues,
  })

  const isUniqueBlockName: ValidationMethodFactory = () => async (value) => {
    if (value && typeof value === 'string') {
      const documents = await api.blockDocuments.getBlockDocuments({
        blockTypes: {
          slug: [props.blockSchema.blockType.slug],
        },
        blockDocuments: {
          name: [value],
        },
      })

      if (documents.length) {
        return 'Block document names must be unique.'
      }

    }

    return true
  }

  const { value: name, meta: nameState, errorMessage: nameError } = useField<string>('name', fieldRules('Name', isRequired, isHandle, isUniqueBlockName))

  watchEffect(() => setStorageValue(values))

  const submit = handleSubmit(value => {
    removeFromStorage()
    emit('submit', value)
  })

  const cancel = (): void => {
    removeFromStorage()
    emit('cancel')
  }
</script>