<template>
  <p-combobox v-model="internalSelected" :multiple="multiple" empty-message="Infer Work Pool" :options="options">
    <template #option="{ option }">
      <template v-if="option.value === null">
        Infer Work Pool
      </template>
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkPool } from '@/models/WorkPool'
  import { asArray } from '@/utilities/arrays'

  const props = defineProps<{
    /**
     * Controlled input model value.
     * If an array is provided, then the component assumes a multi-select.
     * If a multi-select is desired then use an empty array in place of null.
     * */
    selected: string | string[] | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const api = useWorkspaceApi()
  const multiple = Array.isArray(props.selected)
  const workPoolSubscription = await useSubscription(api.workPools.getWorkPools, [{}]).promise()
  // Only show work pools that have a status to exclude push work pools and prefect-agent work pools
  const workPools = computed(() => workPoolSubscription.response.filter(workPool => !!workPool.status))

  function isWorkPool(value: unknown): value is WorkPool {
    return value instanceof WorkPool
  }

  const options = computed<SelectOption[]>(() => {
    const options: SelectOption[] = workPools.value.map(workPool => ({
      value: workPool.name,
      label: workPool.name,
    }))
    return options
  })

  const internalSelected = computed({
    get() {
      const ids = asArray(props.selected)
      const pools = ids.map(id => workPools.value.find(workPool => workPool.id === id)).filter(isWorkPool)
      const names = pools.map(workPool => workPool.name)

      if (multiple) {
        return names
      }

      const [first = null] = names

      return first
    },
    set(selected: string | string[] | null) {
      const names = asArray(selected)
      const pools = names.map(name => workPools.value.find(workPool => workPool.name === name)).filter(isWorkPool)
      const ids = pools.map(workPool => workPool.id)

      if (multiple) {
        emit('update:selected', ids)
        return
      }

      const [first = null] = ids

      return emit('update:selected', first)
    },
  })
</script>