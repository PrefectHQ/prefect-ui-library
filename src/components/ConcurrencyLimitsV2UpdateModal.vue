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

        <p-label label="Slot Decay Per Second">
          <p-number-input v-model="decay" :min="0" />
        </p-label>

        <p-label label="Active Slots">
          <p-number-input v-model="activeSlots" :min="0" />
        </p-label>

        <p-label label="Active">
          <p-toggle v-model="active" />
        </p-label>
      </p-content>
    </p-form>

    <template #actions>
      <slot name="actions">
        <p-button variant="default" :loading="pending" @click="submit">
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
  import { getApiErrorMessage } from '@/utilities/errors'
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

  const active = ref(true)

  const activeSlots = ref(props.concurrencyLimit.activeSlots)


  const decay = ref(props.concurrencyLimit.slotDecayPerSecond)


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
    decay.value = props.concurrencyLimit.slotDecayPerSecond ?? 0
    active.value = props.concurrencyLimit.active ?? true
    activeSlots.value = props.concurrencyLimit.activeSlots ?? 0
  }

  const { valid, pending, validate } = useValidationObserver()
  const submit = async (): Promise<void> => {
    await validate()
    if (valid.value) {
      try {
        const updatedLimit = {
          name: name.value,
          limit: limit.value,
          active: active.value,
          slotDecayPerSecond: decay.value,
          activeSlots: activeSlots.value,
        }
        await api.concurrencyV2Limits.updateConcurrencyV2Limit(props.concurrencyLimit.id, updatedLimit)
        concurrencyLimitSubscription.refresh()
        showToast(localization.success.updateConcurrencyLimit, 'success')
      } catch (error) {
        console.error(error)
        const message = getApiErrorMessage(error, localization.error.updateConcurrencyLimit)
        showToast(message, 'error')
      } finally {
        reset()
        internalShowModal.value = false
      }
    }
  }
</script>
