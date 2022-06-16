<template>
  <div class="notifications-table">
    <div class="notifications-table__search">
      <ResultsCount label="Notification" :count="filtered.length" />
      <NotificationStatusSelect v-model:selected="selectedStatus" />
    </div>

    <p-table :data="filtered" :columns="columns" class="notifications-table">
      <template #notification="{ row }">
        {{ row.name }}
      </template>

      <template #status-heading>
        <span />
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #status="{ row }">
        
      </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults } from '@prefecthq/prefect-design'
  import { ref, computed } from 'vue'
  import NotificationStatusSelect from '@/components/NotificationStatusSelect.vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import { Notification, NotificationStatus } from '@/models'
  import { inject } from '@/utilities'


  const props = defineProps<{
    notifications: Notification[],
  }>()

  const emits = defineEmits<{
    (event: 'update'): void,
    (event: 'delete', value: string): void,
  }>()

  const selectedStatus = ref<NotificationStatus>('all')

  const columns = [
    {
      property: 'notification',
      label: 'Notification',
    },
    {
      property: 'status',
      label: 'Status',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

  const filtered = computed(() => {
    if (selectedStatus.value === 'active') {
      return props.notifications.filter(notification => notification.isActive)
    }

    if (selectedStatus.value === 'paused') {
      return props.notifications.filter(notification => !notification.isActive)
    }

    return props.notifications
  })
</script>