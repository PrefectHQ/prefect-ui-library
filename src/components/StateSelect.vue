<template>
  <div class="state-select">
    <p-select v-model="internalValue" :options="options" :empty-message="emptyMessage">
      <template #option="{ option }">
        <StateBadge :state="{ name: option.label, type: option.value as StateType }" />
      </template>
      <template #default="{ selectedOption, unselectOption }">
        <StateBadge
          class="state-select__option"
          :class="{ 'state-select__option--multiple': multiple }"
          :state="{ name: selectedOption.label, type: selectedOption.value as StateType }"
          :flat="!multiple"
          :dismissible="multiple"
          @dismiss="unselectOption"
        />
      </template>
    </p-select>
  </div>
</template>

<script lang="ts" setup>
  import { PSelect, SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { stateType, StateType } from '@/models/StateType'
  import { capitalize } from '@/utilities'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
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
        emits('update:selected', Array.isArray(value) ? value : [value])
      } else {
        emits('update:selected', value)
      }
    },
  })

  const multiple = computed(() => Array.isArray(internalValue.value))

  const options = computed<SelectOption[]>(() => {
    const stateMap = stateType.map((state) => ({ label: capitalize(state), value: state }))

    return [...stateMap, { label: 'Late', value: 'Late' }]
  })
</script>

<style>
.state-select__option:not(.state-select__option--multiple) { @apply
  text-base
  font-normal
}

.state-select__option:not(.state-select__option--multiple) .state-badge__icon { @apply
  w-5
  h-5
}
</style>