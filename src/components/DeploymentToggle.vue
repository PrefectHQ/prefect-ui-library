<template>
  <p-toggle v-model="isActive">
    <template #append>
      <span>{{ toggleVal }}</span>
    </template>
  </p-toggle>
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { Deployment } from '@/models'

  const props = defineProps<{
    values: Deployment,
  }>()

  const emit = defineEmits<{
    (event: 'update:values', value: Deployment): void,

  }>()

  const internalValue = computed({
    get() {
      return props.values
    },
    set(value: Deployment) {
      emit('update:values', value)
    },
  })

  const isActive = computed({
    get() {
      return !internalValue.value.isScheduleActive
    },
    set(value: boolean) {
      internalValue.value = new Deployment({ ...internalValue.value, isScheduleActive: !value })
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

