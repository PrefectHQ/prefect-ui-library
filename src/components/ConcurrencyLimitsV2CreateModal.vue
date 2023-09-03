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

        <p-label label="Slot Decay Per Second">
          <p-number-input v-model="decay" :min="0" />
        </p-label>

        <p-label label="Active">
          <p-toggle v-model="active" />
        </p-label>
      </p-content>
    </p-form>

    <template #actions>
      <slot name="actions">
        <p-button primary :loading="pending" @click="submit">
          Create
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { PLabel, PNumberInput, PForm, showToast } from '@prefecthq/prefect-design'
  import { useSubscription, useValidation, useValidationObserver } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { isRequired, isGreaterThanZeroOrNull } from '@/utilities/formValidation'
  import { getErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    showModal: boolean,
  }>()
  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const name = ref('')
  const { state: nameState, error: nameErrorMessage } = useValidation(name, 'Name', [isRequired])

  const limit = ref(0)
  const { state: limitState, error: limitErrorMessage } = useValidation(limit, 'Limit', [
    isRequired,
    isGreaterThanZeroOrNull,
  ])

  const active = ref(true)


  const decay = ref(0)

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

  const reset = (): void => {
    name.value = ''
    limit.value = 0
    decay.value = 0
    active.value = true
  }

  const { valid, pending, validate } = useValidationObserver()
  const submit = async (): Promise<void> => {
    await validate()
    if (valid.value) {
      try {
        await api.concurrencyV2Limits.createConcurrencyV2Limit({ name: name.value, limit: limit.value, slotDecayPerSecond: decay.value, active: active.value })
        concurrencyLimitSubscription.refresh()
        showToast(localization.success.createConcurrencyLimit, 'success')
      } catch (error) {
        console.error(error)
        const errMessage = getErrorMessage(error, localization.error.createConcurrencyLimit)
        showToast(errMessage, 'error')
      } finally {
        reset()
        internalShowModal.value = false
      }
    }
  }
</script>
