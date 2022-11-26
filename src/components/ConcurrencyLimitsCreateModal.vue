<template>
  <p-modal v-model:showModal="internalShowModal" class="concurrency-limit-create-modal" title="Add Concurrency Limit">
    <p-form class="concurrency-limit-create-form" @submit="submit">
      <p-content>
        <p-label label="Tag" :message="tagErrorMessage" :state="tagState">
          <p-text-input v-model="tag" :state="tagState" />
        </p-label>

        <p-label label="Concurrency Limit" :message="limitErrorMessage" :state="limitState">
          <p-number-input v-model="concurrencyLimit" :min="0" :state="limitState" />
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
  import { ConcurrencyLimitCreate } from '@/models/ConcurrencyLimitCreate'
  import { isRequired, isGreaterThan, fieldRules } from '@/utilities/validation'

  const props = defineProps<{
    showModal: boolean,
  }>()
  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const { handleSubmit, handleReset, isSubmitting } = useForm<ConcurrencyLimitCreate>()
  const rules = {
    tag: isRequired('Tag'),
    concurrencyLimit: fieldRules('Limit', isRequired, isGreaterThan(0)),
  }
  const { value: tag, meta: tagState, errorMessage: tagErrorMessage } = useField<string>('tag', rules.tag)
  const { value: concurrencyLimit, meta: limitState, errorMessage: limitErrorMessage } = useField<number|null>('concurrencyLimit', rules.concurrencyLimit)

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  const api = useWorkspaceApi()
  const concurrencyLimitSubscription = useSubscription(api.concurrencyLimits.getConcurrencyLimits)
  const submit = handleSubmit(async (values) => {
    try {
      const { tag, concurrencyLimit } = values
      await api.concurrencyLimits.createConcurrencyLimit({ tag, concurrencyLimit })
      concurrencyLimitSubscription.refresh()
      showToast(localization.success.createConcurrencyLimit, 'success')
    } catch (error) {
      console.error(error)
      showToast(localization.error.createConcurrencyLimit, 'error')
    } finally {
      handleReset()
      internalShowModal.value = false
    }
  })
</script>
