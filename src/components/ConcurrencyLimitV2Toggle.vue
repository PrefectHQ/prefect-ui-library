<template>
  <p-tooltip :text="toggleTooltipText">
    <p-toggle v-model="internalValue" :loading="loading" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { ConcurrencyV2Limit } from '@/models'

  const props = defineProps<{
    limit: ConcurrencyV2Limit,
  }>()

  const api = useWorkspaceApi()
  const concurrencyLimitSubscription = useSubscription(api.concurrencyV2Limits.getConcurrencyV2Limits)

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const internalValue = computed({
    get() {
      return !props.limit.active
    },
    set(value: boolean) {
      toggleLimit(value)
    },
  })

  const toggleTooltipText = computed(() => {
    return internalValue.value ? 'Set concurrency limit to active' : 'Set concuurency limit to inactive'
  })

  const loading = ref(false)

  const toggleLimit = async (value: boolean): Promise<void> => {
    loading.value = true

    try {
      await api.concurrencyV2Limits.updateConcurrencyV2Limit(props.limit.id, { active: !value })
      showToast(localization.success.updateConcurrencyLimit, 'success')
      concurrencyLimitSubscription.refresh()
      emit('update')
    } catch (error) {
      const message = localization.error.updateConcurrencyLimit
      showToast(message, 'error')
      console.error(error)
    } finally {
      loading.value = false
    }
  }
</script>

