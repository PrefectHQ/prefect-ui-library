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
  import { PCombobox, SelectOptionGroup, isSelectOptionNormalized } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, watch } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkQueue } from '@/models'

  export type WorkPoolFilterByIdOrName = { id?: string[], name?: string[] }

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
    allowUnset?: boolean,
    multiple?: boolean,
    workPoolFilter?: WorkPoolFilterByIdOrName,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const multiple = computed(() => props.multiple || Array.isArray(props.selected))

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
  const options = computed<SelectOptionGroup[]>(() => {
    const workQueuesGroupedByWorkPool = workQueues.value.reduce<Map<string, WorkQueue[]>>((acc, workQueue) => {
      // Filter options by work pool id or name
      if (props.workPoolFilter?.id || props.workPoolFilter?.name) {
        if (!props.workPoolFilter.id?.includes(workQueue.workPoolId) && !(workQueue.workPoolName && props.workPoolFilter.name?.includes(workQueue.workPoolName))) {
          return acc
        }
      }

      const workPoolName = workQueue.workPoolName ?? 'No work pool'
      acc.set(workPoolName, (acc.get(workPoolName) ?? []).concat(workQueue))
      return acc
    }, new Map())

    const options: SelectOptionGroup[] = []
    for (const [workPoolName, workQueues] of workQueuesGroupedByWorkPool.entries()) {
      options.push({
        label: workPoolName,
        options: workQueues.map(workQueue => ({
          value: workQueue.id,
          label: workQueue.name,
        })),
      })
    }

    if (props.allowUnset) {
      options.unshift({
        options: [{ value: null, label: 'None' }],
        label: '',
      })
    }

    return options
  })

  // Remove previously selected work queues that are no longer options
  // when the options change
  watch(options, (newValue, oldValue) => {
    const newWorkQueueIds = new Set(newValue.flatMap(group => group.options.map((option) => {
      if (isSelectOptionNormalized(option)) {
        return option.value
      }
      return null
    })))

    const removedWorkQueueIds = new Set()
    for (const group of oldValue) {
      for (const option of group.options) {
        if (isSelectOptionNormalized(option) && !newWorkQueueIds.has(option.value)) {
          removedWorkQueueIds.add(option.value)
        }
      }
    }

    if (removedWorkQueueIds.size === 0) {
      return
    }

    if (!multiple.value && internalValue.value && removedWorkQueueIds.has(internalValue.value)) {
      internalValue.value = undefined
    } else if (Array.isArray(internalValue.value) && internalValue.value.length) {
      internalValue.value = internalValue.value.filter(id => !removedWorkQueueIds.has(id))
    }
  })
</script>