<template>
  <p-modal v-model:showModal="internalShowModal" class="concurrency-limit-reset-modal" :title="resetTitle">
    This will reset the active task run count to 0.
    <template #actions>
      <slot name="actions">
        <p-button primary @click="submit">
          Reset
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { ConcurrencyLimit } from '@/models/ConcurrencyLimit'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    showModal: boolean,
    concurrencyLimit: ConcurrencyLimit,
  }>()
  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
  }>()

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  const resetTitle = computed(() => {
    return `Reset concurrency limit for tag ${props.concurrencyLimit.tag}?`
  })

  const api = useWorkspaceApi()
  const concurrencyLimitSubscription = useSubscription(api.concurrencyLimits.getConcurrencyLimit, [props.concurrencyLimit.id])
  const concurrencyLimitsSubscription = useSubscription(api.concurrencyLimits.getConcurrencyLimits)
  const submit = async (): Promise<void> => {
    try {
      await api.concurrencyLimits.resetConcurrencyLimitByTag(props.concurrencyLimit.tag)
      concurrencyLimitSubscription.refresh()
      concurrencyLimitsSubscription.refresh()
      showToast(localization.success.resetConcurrencyLimit, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.resetConcurrencyLimit)
      showToast(message, 'error')
    } finally {
      internalShowModal.value = false
    }
  }
</script>
