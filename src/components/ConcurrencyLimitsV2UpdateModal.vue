<template>
  <p-modal v-model:showModal="internalShowModal" class="concurrency-limits-v2-update-modal" :title="updateLimitTitle">
    <p-form class="concurrency-limits-v2-update-form" @submit="submit">
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
        <p-button :loading="pending" @click="submit">
          Update
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
  import { ConcurrencyV2Limit } from '@/models/ConcurrencyV2Limit'
  import { isRequired, isGreaterThanZeroOrNull } from '@/utilities/formValidation'

  const props = defineProps<{
    showModal: boolean,
    concurrencyLimit: ConcurrencyV2Limit,
  }>()
  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const updateLimitTitle = computed(() => `Update ${props.concurrencyLimit.name}`)

  const name = ref(props.concurrencyLimit.name)
  const { state: nameState, error: nameErrorMessage } = useValidation(name, 'Name', [isRequired])

  const limit = ref(props.concurrencyLimit.limit)
  const { state: limitState, error: limitErrorMessage } = useValidation(limit, 'Limit', [
    isRequired,
    isGreaterThanZeroOrNull,
  ])

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
    name.value = props.concurrencyLimit.name
    limit.value = props.concurrencyLimit.limit
  }

  const { valid, pending, validate } = useValidationObserver()
  const submit = async (): Promise<void> => {
    await validate()
    if (valid.value) {
      try {
        await api.concurrencyV2Limits.updateConcurrencyV2Limit(props.concurrencyLimit.id, { name: name.value, limit: limit.value })
        concurrencyLimitSubscription.refresh()
        showToast(localization.success.updateConcurrencyLimit, 'success')
      } catch (error) {
        console.error(error)
        showToast(localization.error.updateConcurrencyLimit, 'error')
      } finally {
        reset()
        internalShowModal.value = false
      }
    }
  }
</script>
