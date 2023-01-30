<template>
  <p-combobox v-model="internalValue" v-bind="{ options, multiple, emptyMessage }">
    <template #combobox-options-empty>
      No work queues
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

  const api = useWorkspaceApi()
  const workQueuesSubscription = useSubscription(api.workQueues.getWorkQueues, [{}])
  const workQueues = computed(() => workQueuesSubscription.response ?? [])
  const options = computed<SelectOption[]>(() => {
    const options: SelectOption[] = workQueues.value.map(workQueue => ({
      // Any consumers of the work queue should subscribe to it by name and not id
      value: workQueue.name,
      label: workQueue.name,
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