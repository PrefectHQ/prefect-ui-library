<template>
  <div class="flow-runner-checkboxes">
    <template v-for="option in options" :key="option.value">
      <PCheckbox v-model="model" :label="option.label" :value="option.value" :disabled="disabled" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PCheckbox } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { FlowRunnerType } from '@/types/FlowRunnerType'

  const props = defineProps<{
    selected: FlowRunnerType[],
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: FlowRunnerType[]): void,
  }>()

  const model = computed({
    get() {
      return props.selected
    },
    set(value: FlowRunnerType[]) {
      emit('update:selected', value)
    },
  })

  const options: { label: string, value: FlowRunnerType }[] = [
    { label: 'Universal', value: 'universal' },
    { label: 'Kubernetes', value: 'kubernetes' },
    { label: 'Docker', value: 'docker' },
    { label: 'Subprocess', value: 'subprocess' },
  ]
</script>