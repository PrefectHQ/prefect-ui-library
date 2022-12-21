<template>
  <PSelect v-model="model" :options="options" class="block-type-select">
    <template #default="{ selectedOption }">
      {{ selectedOption.label }}
    </template>
  </PSelect>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { WorkerPoolType, workerPoolTypes } from '@/models'

  const props = defineProps<{
    selected: string | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const model = computed({
    get() {
      return props.selected
    },
    set(value: string | null) {
      emit('update:selected', value)
    },
  })

  const options = computed<SelectOption[]>(() => {
    const options: { label: string, value: WorkerPoolType }[] = workerPoolTypes.map((type) => ({
      label: type,
      value: type,
    }))

    return options
  })
</script>