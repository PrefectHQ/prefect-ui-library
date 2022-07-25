<template>
  <p-combobox v-model="internalValue" :options="options" :empty-message="emptyMessage">
    <template #options-empty>
      No flows
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { flowsApiKey } from '@/services/FlowsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const multiple = computed(() => Array.isArray(props.selected))

  const internalValue = computed({
    get() {
      return props.selected ?? null
    },
    set(value: string | string[] | null) {
      if (!value) {
        emits('update:selected', null)
      } else if (multiple.value) {
        emits('update:selected', Array.isArray(value) ? value : [value])
      } else {
        emits('update:selected', value)
      }
    },
  })

  const flowsApi = inject(flowsApiKey)
  const flowsSubscription = useSubscription(flowsApi.getFlows, [{}])
  const flows = computed(() => flowsSubscription.response ?? [])
  const options = computed<SelectOption[]>(() => flows.value.map(flow => ({
    value: flow.id,
    label: flow.name,
  })))
</script>
