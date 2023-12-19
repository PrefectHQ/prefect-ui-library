<template>
  <p-select v-model="internalValue" class="state-name-select" v-bind="{ options, multiple, emptyMessage }">
    <template #option="{ option }">
      <template v-if="option.value === allExceptScheduled">
        All except scheduled
      </template>
      <template v-else>
        <StateBadge :state="getStateFromTagValue(option.value)" />
      </template>
    </template>
    <template #tag="{ value, dismiss }">
      <template v-if="value === allExceptScheduled">
        All except scheduled
      </template>
      <template v-else>
        <StateBadge
          class="state-name-select__option state-name-select__option--multiple"
          :state="getStateFromTagValue(value)"
          dismissible
          @dismiss="dismiss"
        />
      </template>
    </template>
    <template #default="{ value }">
      <template v-if="value === allExceptScheduled">
        All except scheduled
      </template>
      <template v-else>
        <StateBadge
          class="state-name-select__option"
          :state="getStateFromTagValue(value)"
          flat
        />
      </template>
    </template>
  </p-select>
</template>

<script lang="ts" setup>
  import { isArray, PSelect, SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { StateBadgeState } from '@/types/stateBadge'
  import { prefectStateNames } from '@/types/states'
  import { mapStateNameToStateType } from '@/utilities'

  const allExceptScheduled = 'allExceptScheduled'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
    multiple?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const multiple = computed(() => props.multiple || isArray(internalValue.value))

  const internalValue = computed({
    get() {
      const isAllExceptScheduled = props.selected?.length === prefectStateNames.length - 1
        && !props.selected.includes('Scheduled')

      if (isAllExceptScheduled) {
        return allExceptScheduled
      }

      return props.selected ?? null
    },
    set(value: string | string[] | null) {
      if (!value) {
        emits('update:selected', null)
      } else if (multiple.value) {
        const values = isArray(value) ? value : [value]

        if (values.includes(allExceptScheduled)) {
          emits('update:selected', prefectStateNames.filter((stateName) => stateName !== 'Scheduled'))
        } else {
          emits('update:selected', values)
        }
      } else {
        emits('update:selected', value)
      }
    },
  })

  const options = computed<SelectOption[]>(() => {
    const stateNames = prefectStateNames.map((stateName) => {
      const { name, type } = mapStateNameToStateType(stateName)

      return {
        label: name,
        value: name,
        type,
      }
    })

    return [
      {
        label: 'All except scheduled',
        value: allExceptScheduled,
      },
      ...stateNames,
    ]
  })

  const getStateFromTagValue = (value: unknown): StateBadgeState | null => {
    if (typeof value == 'string') {
      return mapStateNameToStateType(value)
    }

    return null
  }
</script>

<style>
.state-name-select {
  min-width: theme('spacing.40')
}
</style>