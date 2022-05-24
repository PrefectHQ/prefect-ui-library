<template>
  <div class="state-select">
    <p-select v-model="internalValue" :options="options" :empty-message="emptyMessage">
      <template #option="{ option }">
        <StateBadge flat :state="{ name: option.value, type: option.value }" />
      </template>
      <template #default="{ selectedOption, unselectOption }">
        <StateBadge
          class="state-select__option"
          :class="{ 'state-select__option--multiple': multiple }"
          :state="{ name: selectedOption.value, type: selectedOption.value }"
          :flat="!multiple"
          :dismissible="multiple"
          @dismiss="unselectOption"
        />
      </template>
    </p-select>
  </div>
</template>

<script lang="ts" setup>
  import { PSelect } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { stateType } from '@/models/StateType'

  const props = defineProps<{
    stateType: string | string[] | null | undefined,
    emptyMessage?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:stateType', value: string | string[] | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.stateType ?? null
    },
    set(value: string | string[] | null) {
      console.log({ value })
      if (!value) {
        emits('update:stateType', null)
      } else if (multiple.value) {
        emits('update:stateType', Array.isArray(value) ? value : [value])
      } else {
        emits('update:stateType', value)
      }
    },
  })

  const multiple = computed(() => Array.isArray(internalValue.value))

  const options = computed(() => [...stateType, 'late'])
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