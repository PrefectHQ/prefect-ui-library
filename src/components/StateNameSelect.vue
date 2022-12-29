<template>
  <div class="state-name-select">
    <p-select v-model="internalValue" :options="options" :empty-message="emptyMessage">
      <template #option="{ option }">
        <StateBadge :state="{ name: option.label, type: option.value as StateType }" />
      </template>
      <template #tag="{ label, value, dismiss }">
        <StateBadge
          class="state-name-select__option"
          :class="{ 'state-name-select__option--multiple': multiple }"
          :state="{ label, type: value as StateType }"
          :flat="!multiple"
          :dismissible="multiple"
          @dismiss="dismiss"
        />
      </template>
    </p-select>
  </div>
</template>

<script lang="ts" setup>
  import { isArray, PSelect, SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { StateType } from '@/models/StateType'
  import { prefectStateNames } from '@/types/states'
  import { mapStateNameToStateType } from '@/utilities'

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
        emits('update:selected', isArray(value) ? value : [value])
      } else {
        emits('update:selected', value)
      }
    },
  })

  const multiple = computed(() => isArray(internalValue.value))

  const options = computed<SelectOption[]>(() => prefectStateNames.map((stateName) => {
    const { name, type } = mapStateNameToStateType(stateName)

    return {
      label: name,
      value: name,
      type,
    }
  }))
</script>