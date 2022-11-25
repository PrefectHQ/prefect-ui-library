<template>
  <p-form class="concurrency-limit-create-form" @submit="submit">
    <p-content>
      <p-label label="Tag">
        <p-text-input v-model="tag" />
      </p-label>

      <p-label label="Concurrency Limit">
        <p-number-input v-model="concurrencyLimit" placeholder="Unlimited" :min="0" />
      </p-label>
    </p-content>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <SubmitButton action="Create" :loading="isSubmitting" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PNumberInput, PForm } from '@prefecthq/prefect-design'
  import { useField } from 'vee-validate'
  import SubmitButton from './SubmitButton.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useForm } from '@/compositions/useForm'
  import { ConcurrencyLimitCreate } from '@/models/ConcurrencyLimitCreate'
  import { isRequired } from '@/utilities/validation'

  const api = useWorkspaceApi()
  const { handleSubmit, isSubmitting } = useForm<ConcurrencyLimitCreate>()

  const rules = {
    tag: isRequired('Tag'),
  }


  const { value: tag } = useField<string>('tag', rules.tag)
  const { value: concurrencyLimit } = useField<number|null>('concurrencyLimit')

  const emit = defineEmits<{
    (event: 'submit', value: ConcurrencyLimitCreate): void,
    (event: 'cancel'): void,
  }>()

  const submit = handleSubmit(async (values) => {
    try {
      const { tag, concurrencyLimit } = values
      await api.concurrencyLimits.createConcurrencyLimit({ tag, concurrencyLimit })
    } catch (e) {
      console.log(e)
    }
  })

  function cancel(): void {
    emit('cancel')
  }
</script>

<style>
.concurrency-limit-create-form {
@apply
border-[1px]
border-gray-300
px-6
py-6
rounded-lg
}
</style>