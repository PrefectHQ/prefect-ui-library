<template>
  <p-toggle v-model="isActive">
    <template #append>
      <span>{{ toggleVal }}</span>
    </template>
  </p-toggle>
</template>

<script lang="ts" setup>
  import  { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { WorkQueue } from '@/models'

  const props = defineProps<{
    values: WorkQueue,
  }>()

  const emit = defineEmits<{
    (event: 'update:values', value: WorkQueue): void,

  }>()

  const internalValue = computed({
    get() {
      return props.values
    },
    set(value: WorkQueue) {
      emit('update:values', value)
    },
  })

  const isActive = computed({
    get() {
      return !internalValue.value.isPaused
    },
    set(value: boolean) {
      internalValue.value = new WorkQueue({ ...internalValue.value, isPaused: !value })
    },
  })

  const toggleVal = computed(() => {
    if (isActive.value) {
      showToast(`${props.values.name} is active`, 'success', undefined, 3000)
      return 'Active'
    }
    showToast(`${props.values.name} is paused`, 'error', undefined, 3000)
    return 'Paused'
  })
</script>

