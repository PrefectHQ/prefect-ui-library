<template>
  <p-modal v-model:showModal="showModal" class="concurrency-limit-reset-modal" :title="resetTitle">
    This will reset the active slots count to 0.
    <template #actions>
      <slot name="actions">
        <p-button variant="default" @click="submit">
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
  import { ConcurrencyV2Limit } from '@/models/ConcurrencyV2Limit'
  import { getApiErrorMessage } from '@/utilities/errors'

  const props = defineProps<{
    concurrencyLimit: ConcurrencyV2Limit,
  }>()

  const showModal = defineModel<boolean>('showModal')

  const resetTitle = computed(() => {
    return `Reset concurrency limit ${props.concurrencyLimit.name}?`
  })

  const api = useWorkspaceApi()
  const concurrencyLimitSubscription = useSubscription(api.concurrencyV2Limits.getConcurrencyV2Limit, [props.concurrencyLimit.id])
  const concurrencyLimitsSubscription = useSubscription(api.concurrencyV2Limits.getConcurrencyV2Limits)

  const submit = async (): Promise<void> => {
    try {
      await api.concurrencyV2Limits.updateConcurrencyV2Limit(props.concurrencyLimit.id, {
        activeSlots: 0,
      })
      concurrencyLimitSubscription.refresh()
      concurrencyLimitsSubscription.refresh()
      showToast(localization.success.resetConcurrencyLimit, 'success')
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.resetConcurrencyLimit)
      showToast(message, 'error')
    } finally {
      showModal.value = false
    }
  }
</script>
