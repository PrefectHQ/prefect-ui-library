<template>
  <p-select v-model="model" :options="options" class="notification-status-select" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { NotificationStatus } from '@/models'

  const props = defineProps<{
    selected: NotificationStatus,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: NotificationStatus): void,
  }>()

  const model = computed({
    get() {
      return props.selected
    },
    set(value: NotificationStatus) {
      emit('update:selected', value)
    },
  })

  const options: { label: string, value: NotificationStatus }[] = [
    { label: 'Status: All', value: 'all' },
    { label: 'Status: Active', value: 'active' },
    { label: 'Status: Paused', value: 'paused' },
  ]
</script>