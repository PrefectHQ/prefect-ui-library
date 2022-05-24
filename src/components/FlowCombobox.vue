<template>
  <div class="flow-combobox">
    <p-combobox v-model="internalValue" :options="options" :empty-message="emptyMessage" />
  </div>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { flowsApiKey } from '@/services/FlowsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    selectedFlowId: string | string[] | null | undefined,
    emptyMessage?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:selectedFlowId', value: string | string[] | null): void,
  }>()

  const multiple = computed(() => Array.isArray(props.selectedFlowId))

  const internalValue = computed({
    get() {
      return props.selectedFlowId ?? null
    },
    set(value: string | string[] | null) {
      console.log({ value })
      if (!value) {
        emits('update:selectedFlowId', null)
      } else if (multiple.value) {
        emits('update:selectedFlowId', Array.isArray(value) ? value : [value])
      } else {
        emits('update:selectedFlowId', value)
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