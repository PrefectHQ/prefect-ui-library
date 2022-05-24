<template>
  <div class="state-select">
    <p-select v-model="selectedStateType" :options="options" :multiple="multiple">
      <template #option="{ option }">
        <div class="state-select__option">
          <StateIcon :state-type="option.value" />
          <span>{{ option.label }}</span>
        </div>
      </template>
      <div class="state-select__option">
        <template v-if="!selectedStateType.length">
          <span>{{ emptyMessage }}</span>
        </template>
        <template v-else-if="selectedStateType.length === 1">
          <StateIcon :state-type="selectedStateType[0]" />
          <span>{{ selectedStateType[0] }}</span>
        </template>
        <template v-else>
          {{ selectedStateType.length }} {{ toPluralString('state', selectedStateType.length) }}
        </template>
      </div>
    </p-select>
  </div>
</template>

<script lang="ts" setup>
  import { PSelect } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import StateIcon from '@/components/StateIcon.vue'
  import { StateType, stateType } from '@/models/StateType'
  import { toPluralString } from '@/utilities/strings'

  const props = defineProps<{
    stateType: string | string[] | null | undefined,
    multiple?: boolean,
    emptyMessage?: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:stateType', value: string | string[] | null): void,
  }>()

  const selectedStateType = computed<StateType[]>({
    get() {
      if (!props.stateType) {
        return []
      }

      if (!Array.isArray(props.stateType)) {
        return [props.stateType as StateType]
      }

      return props.stateType as StateType[]
    },
    set(value: StateType[]) {
      if (!props.multiple) {
        emits('update:stateType', value.pop() ?? null)
      } else {
        emits('update:stateType', value)
      }
    },
  })

  const options = computed(() => [...stateType, 'late'])
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