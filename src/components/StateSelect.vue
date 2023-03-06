<template>
  <div class="state-select">
    <p-select v-model="internalValue" :options="options" :empty-message="emptyMessage">
      <template #option="{ option }">
        <StateBadge :state="getStateFromTagValue(option.value)" />
      </template>
      <template v-if="multiple" #tag="{ value, dismiss }">
        <StateBadge
          class="state-select__option state-select__option--multiple"
          :state="getStateFromTagValue(value)"
          dismissible
          @dismiss="dismiss"
        />
      </template>
      <template v-else #default="{ value }">
        <StateBadge
          class="state-select__option"
          :state="getStateFromTagValue(value)"
        />
      </template>
    </p-select>
  </div>
</template>

<script lang="ts" setup>
  import { isArray, PSelect, SelectOption, TagValue } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { stateType, terminalStateType } from '@/models/StateType'
  import { StateBadgeState } from '@/types/stateBadge'
  import { capitalize, mapStateNameToStateType } from '@/utilities'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
    terminalState?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.selected ?? null
    },
    set(value: string | string[] | null) {
      if (!value) {
        emits('update:selected', null)
      } else if (multiple.value) {
        emits('update:selected', isArray(value) ? value : [value])
      } else {
        emits('update:selected', value)
      }
    },
  })

  const multiple = computed(() => isArray(internalValue.value))

  const options = computed<SelectOption[]>(() => {
    if (props.terminalState) {
      return terminalStateType.map((state) => ({
        label: capitalize(state),
        value: state,
      }))
    }

    const stateMap = stateType.map((state) => ({ label: capitalize(state), value: state }))

    return [...stateMap, { label: 'Late', value: 'late' }, { label: 'Cancelling', value: 'cancelling' }]
  })

  const getStateFromTagValue = ({ value }: TagValue): StateBadgeState | null => {
    if (typeof value == 'string') {
      return mapStateNameToStateType(value)
    }

    return null
  }
</script>

<style>
.state-select__option .state-badge__icon { @apply
  w-5
  h-5
}
</style>