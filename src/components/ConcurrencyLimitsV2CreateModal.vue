<template>
  <p-modal v-model:showModal="internalShowModal" class="concurrency-limits-v2-create-modal" title="Add Concurrency Limit">
    <p-form class="concurrency-limits-v2-create-form" @submit="submit">
      <p-content>
        <p-label label="Name" :message="nameErrorMessage" :state="nameState">
          <p-text-input v-model="name" :state="nameState" />
        </p-label>

        <p-label label="Concurrency Limit" :message="limitErrorMessage" :state="limitState">
          <p-number-input v-model="limit" :min="0" :state="limitState" />
        </p-label>
      </p-content>
    </p-form>

    <template #actions>
      <slot name="actions">
        <p-button :loading="isSubmitting" @click="submit">
          Add
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { PLabel, PNumberInput, PForm, showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useForm } from '@/compositions/useForm'
  import { localization } from '@/localization'
  import { ConcurrencyV2Create } from '@/models/ConcurrencyV2Create'
  import { isRequired, isGreaterThan, fieldRules } from '@/utilities/validation'

  const props = defineProps<{
    showModal: boolean,
  }>()
  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const { handleSubmit, resetForm, isSubmitting } = useForm<ConcurrencyV2Create>()
  const rules = {
    name: isRequired('name'),
    concurrencyLimit: fieldRules('Limit', isRequired, isGreaterThan(0)),
  }
  const { value: name, meta: nameState, errorMessage: nameErrorMessage } = useField<string>('name', rules.name)
  const { value: limit, meta: limitState, errorMessage: limitErrorMessage } = useField<number|null>('limit', rules.concurrencyLimit)

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  const api = useWorkspaceApi()
  const concurrencyLimitSubscription = useSubscription(api.concurrencyV2Limits.getConcurrencyV2Limits)
  const submit = handleSubmit(async (values) => {
    try {
      const { name, limit } = values
      await api.concurrencyV2Limits.createConcurrencyV2Limit({ name, limit })
      concurrencyLimitSubscription.refresh()
      showToast(localization.success.createConcurrencyLimit, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.createConcurrencyLimit, 'error')
    } finally {
      resetForm()
      internalShowModal.value = false
    }
  })
</script>
