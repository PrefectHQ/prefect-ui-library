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
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const multiple = computed(() => Array.isArray(props.selected))

  const internalValue = computed<typeof props.selected>({
    get() {
      return props.selected ?? null
    },
    set(value: string | string[] | null | undefined) {
      if (!value) {
        emits('update:selected', null)
      } else if (multiple.value) {
        emits('update:selected', Array.isArray(value) ? value : [value])
      } else {
        emits('update:selected', value)
      }
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