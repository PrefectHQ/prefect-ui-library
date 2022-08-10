<template>
  <p-combobox v-model="internalValue" :options="options" :empty-message="emptyMessage">
    <template #options-empty>
      No work queues
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { workQueuesApiKey } from '@/services/WorkQueuesApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    modelValue: string | null,
    emptyMessage?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: string | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | null) {
      emits('update:modelValue', value)
    },
  })

  const workQueuesApi = inject(workQueuesApiKey)
  const workQueuesSubscription = useSubscription(workQueuesApi.getWorkQueues, [{}])
  const workQueues = computed(() => workQueuesSubscription.response ?? [])
  const options = computed<SelectOption[]>(() => workQueues.value.map(workQueue => ({
    // Any consumers of the work queue should subscribe to it by name and not id
    value: workQueue.name,
    label: workQueue.name,
  })))
</script>