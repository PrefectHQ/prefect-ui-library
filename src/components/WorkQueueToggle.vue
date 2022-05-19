<template>
  <p-toggle v-model="value">
    <template #append>
      <span>{{ isActive }}</span>
    </template>
  </p-toggle>
</template>

<script lang="ts" setup>
  import { PToggle } from '@prefecthq/prefect-design'
  import { showToast } from '@prefecthq/prefect-design/dist/types/src/plugins/Toast'

  import { computed } from 'vue'
  import { WorkQueue } from '@/models'

  const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
  }>()

  const isActive = computed(() => {
    if (value.value) {
      // showToast(`${props.workQueue.name} is active`, 'success', undefined, 3000)
      return 'Active'
    }
    // showToast(`${props.workQueue.name} is paused`, 'success', undefined, 3000)
    return 'Paused'
  })


  const props = defineProps<{
    modelValue: boolean,
    workQueue: WorkQueue,
  }>()

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      emits('update:modelValue', value)
    },
  })
</script>

