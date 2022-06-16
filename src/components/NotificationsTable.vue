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

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <NotificationToggle :notification="row" @update="emits('update')" />
        <NotificationMenu :notification="row" @delete="id => emits('delete', id)" />
      </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults } from '@prefecthq/prefect-design'
  import { ref, computed } from 'vue'
  import NotificationMenu from '@/components/NotificationMenu.vue'
  import NotificationStatusSelect from '@/components/NotificationStatusSelect.vue'
  import NotificationToggle from '@/components/NotificationToggle.vue'
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