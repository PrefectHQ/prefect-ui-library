<template>
  <p-combobox v-model="internalValue" v-bind="{ options, multiple, emptyMessage }">
    <template #combobox-options-empty>
      No flows
    </template>
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
    <template #option="{ option }">
      <slot name="option" :option="option" />
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
    allowUnset?: boolean,
    multiple?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const multiple = computed(() => props.multiple === true || Array.isArray(props.selected))

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

  const api = useWorkspaceApi()
  const flowsSubscription = useSubscription(api.flows.getFlows, [{}])
  const flows = computed(() => flowsSubscription.response ?? [])
  const options = computed<SelectOption[]>(() => {
    const options: SelectOption[] = flows.value.map(flow => ({
      value: flow.id,
      label: flow.name,
    }))

    if (props.allowUnset) {
      options.unshift({
        value: null,
        label: 'None',
      })
    }

    return options
  })
</script>
