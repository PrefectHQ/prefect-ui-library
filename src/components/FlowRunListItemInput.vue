<template>
  <StateListItemInput v-model:selected="model" v-bind="{ value, disabled, stateType }" class="flow-run-list-item-input">
    <StateBadge :state="flowRun.state" />
  </StateListItemInput>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import StateListItemInput from './StateListItemInput.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { FlowRun } from '@/models/FlowRun'

  type Selected = boolean | unknown[] | undefined

  const props = defineProps<{
    selected: Selected | null,
    value: unknown,
    flowRun: FlowRun,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: Selected): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? undefined
    },
    set(value: Selected) {
      emit('update:selected', value)
    },
  })

  const stateType = computed(() => props.flowRun.state?.type)
</script>

<style>
.flow-run-list-item-input {

}
</style>