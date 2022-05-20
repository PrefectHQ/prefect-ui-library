<template>
  <p-toggle v-model="value">
    <template #append>
      <span>{{ isActive }}</span>
    </template>
  </p-toggle>
</template>

<script lang="ts" setup>
  import { PToggle, showToast } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { Deployment } from '@/models'

  const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void,
  }>()

  const isActive = computed(() => {
    if (value.value) {
      showToast(`${props.deployment.name} is active`, 'success', undefined, 3000)
      return 'Active'
    }
    showToast(`${props.deployment.name} is paused`, 'error', undefined, 3000)
    return 'Paused'
  })


  const props = defineProps<{
    modelValue: boolean,
    deployment: Deployment,
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

