<template>
  <div class="state-name-select">
    <p-select v-model="internalValue" v-bind="{ options, multiple, emptyMessage }">
      <template #option="{ option }">
        <StateBadge :state="{ name: option.label, type: option.value as StateType }" />
      </template>
      <template v-if="multiple" #tag="{ label, value, dismiss }">
        <StateBadge
          class="state-name-select__option state-name-select__option--multiple"
          :state="{ name: label, type: value as StateType }"
          dismissible
          @dismiss="dismiss"
        />
      </template>
      <template v-else #default="{ label, value }">
        <StateBadge
          class="state-name-select__option"
          :state="{ name: label, type: value as StateType }"
          flat
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
    multiple?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const multiple = computed(() => props.multiple === true || isArray(internalValue.value))

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

  const options = computed<SelectOption[]>(() => prefectStateNames.map((stateName) => {
    const { name, type } = mapStateNameToStateType(stateName)

    return {
      label: name,
      value: name,
      type,
    }
  }))
</script>