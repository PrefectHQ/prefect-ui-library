<template>
  <p-modal v-model:showModal="internalShowModal" class="concurrency-limit-reset-modal" :title="resetTitle">
    This will clear all active task runs.
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
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    showModal: boolean,
    tag: string,
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
    return `Reset concurrency limit for tag ${props.tag}?`
  })

  const api = useWorkspaceApi()
  const concurrencyLimitSubscription = useSubscription(api.concurrencyLimits.getConcurrencyLimits)
  const submit = async (): Promise<void> => {
    try {
      await api.concurrencyLimits.resetConcurrencyLimitByTag(props.tag)
      concurrencyLimitSubscription.refresh()
      // showToast(localization.success.resetConcurrencyLimit, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.createConcurrencyLimit)
      showToast(message, 'error')
    } finally {
      // reset()
      internalShowModal.value = false
    }
  }
</script>
