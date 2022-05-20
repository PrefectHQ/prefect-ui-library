<template>
  <div class="state-select">
    <p-select v-model="selectedStateType" :options="options" :multiple="multiple">
      <template #option="{ option }">
        <div class="state-select__option">
          <StateIcon :state-type="option.value" />
          <span>{{ option.label }}</span>
        </div>
      </template>
      <template #default="{ selectedOption }">
        <template v-if="Array.isArray(selectedOption) && selectedOption.length !== 1">
          {{ getMultipleDisplayValue(selectedOption) }}
        </template>
        <template v-else-if="selectedOption">
          <div class="state-select__option">
            <StateIcon :state-type="getSingleSelected(selectedOption).value" />
            <span>{{ getSingleSelected(selectedOption).label }}</span>
          </div>
        </template>
      </template>
    </p-select>
  </div>
</template>

<script lang="ts" setup>
  import { PSelect, SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import StateIcon from '@/components/StateIcon.vue'
  import { stateType, StateType } from '@/models/StateType'
  import { toPluralString } from '@/utilities/strings'

  type StateOption = SelectOption & { value: StateType }

  const props = defineProps<{
    stateType: string | string[] | null | undefined,
    multiple?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:stateType', value: string | string[] | null): void,
  }>()

  const selectedStateType = computed({
    get() {
      return props.stateType ?? null
    },
    set(value: string | string[] | null) {
      emits('update:stateType', value)
    },
  })

  const options = computed(() => [...stateType, 'late'])

  function getSingleSelected(selected: StateOption | StateOption[]): StateOption {
    if (Array.isArray(selected)) {
      [selected] = selected
    }

    return selected
  }

  function getMultipleDisplayValue(selected: StateOption[]): string {
    if (!selected.length) {
      return ''
    }

    return `${selected.length} ${toPluralString('state', selected.length)}`
  }
</script>

<style>
.state-select__option { @apply
  flex
  items-center
  gap-2
  capitalize
}

.state-select__option svg { @apply
  h-4
  w-4
}
</style>