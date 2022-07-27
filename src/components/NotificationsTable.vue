<template>
  <div class="notifications-table">
    <div class="notifications-table__search">
      <ResultsCount label="Notification" :count="filtered.length" />
      <NotificationStatusSelect v-model:selected="selectedStatus" />
    </div>

    <p-table :data="filtered" :columns="columns" class="notifications-table">
      <template #notification="{ row }">
        <div class="notifications-table__details">
          <BlockDocument v-slot="{ blockDocument }" :block-document-id="row.blockDocumentId">
            <NotificationDetails
              :notification="row"
              :block-type="blockDocument.blockType"
              :data="blockDocument.data"
            />
          </BlockDocument>
        </div>
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <div class="notifications-table__actions">
          <NotificationToggle :notification="row" @update="emits('update')" />
          <NotificationMenu size="xs" :notification="row" @delete="id => emits('delete', id)" />
        </div>
      </template>

      <template #empty-state>
        <PEmptyResults>
          <template #message>
            No notifications
          </template>
          <template v-if="hasFilter" #actions>
            <p-button size="sm" secondary @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
      </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
  import { PTable, PEmptyResults } from '@prefecthq/prefect-design'
  import { ref, computed } from 'vue'
  import BlockDocument from '@/components/BlockDocument.vue'
  import NotificationDetails from '@/components/NotificationDetails.vue'
  import NotificationMenu from '@/components/NotificationMenu.vue'
  import NotificationStatusSelect from '@/components/NotificationStatusSelect.vue'
  import NotificationToggle from '@/components/NotificationToggle.vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import { Notification, NotificationStatus } from '@/models'

  const props = defineProps<{
    notifications: Notification[],
  }>()

  const emits = defineEmits<{
    (event: 'update'): void,
    (event: 'delete', value: string): void,
  }>()

  const selectedStatus = ref<NotificationStatus>('all')
  const hasFilter = computed(() => selectedStatus.value !== 'all')

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

  function clear(): void {
    selectedStatus.value = 'all'
  }
</script>

<style>
.notifications-table__search { @apply
  flex
  justify-between
  items-center
  mb-4
}

.notifications-table__details { @apply
  whitespace-normal
}

.notifications-table__actions { @apply
  flex
  gap-2
}
</style>