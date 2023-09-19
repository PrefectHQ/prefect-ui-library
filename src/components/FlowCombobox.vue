<template>
  <p-combobox v-model="selected" v-model:search="search" :options="options" manual @bottom="next">
    <template #combobox-options-empty>
      No flows
    </template>
    <template #default="scope">
      <slot v-bind="scope">
        <UseFlowSlot v-if="isString(scope.value)" :flow-id="scope.value">
          <template #default="{ flow }">
            {{ flow.name }}
          </template>
        </UseFlowSlot>
      </slot>
    </template>
    <template #option="{ option }">
      <slot name="option" :option="option" />
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import UseFlowSlot from '@/components/UseFlowSlot.vue'
  import { useFlows } from '@/compositions'
  import { FlowsFilter } from '@/models/Filters'
  import { isString } from '@/utilities'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    allowUnset?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const search = ref('')
  const searchDebounced = useDebouncedRef(search, 500)

  const selected = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emit('update:selected', value)
    },
  })

  const filter = (): FlowsFilter => ({
    flows: {
      nameLike: searchDebounced.value,
    },
    limit: 20,
  })

  const { flows, next } = useFlows(filter, { mode: 'infinite' })

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
