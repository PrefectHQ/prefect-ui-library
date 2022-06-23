<template>
  <div class="notification-details">
    If a run of any flow with
    <SeparatedList :item-array="notification.tags">
      <template #first-items="{ item }">
        <p-tag>{{ item }}</p-tag>
      </template>
      <template #last-item="{ item }">
        <p-tag>{{ item }}</p-tag>
      </template>
    </SeparatedList>

    tag enters

    <SeparatedList :item-array="notification.stateNames">
      <template #first-items="{ item }">
        <StateBadge :state="mapStateNameToStateType(item)" />
      </template>
      <template #last-item="{ item }">
        <StateBadge :state="mapStateNameToStateType(item)" />
      </template>
    </SeparatedList>

    state, send a notification to

    <template v-if="blockDocumentDataKey == 'email'">
      <span class="notification-details__send-to">
        <p-icon icon="MailIcon" class="notification-details__icon notification-details__icon--mail" />
        {{ blockDocumentDataValue }}
      </span>
    </template>
    <template v-else>
      <span class="notification-details__send-to">
        <p-icon icon="Slack" class="notification-details__icon" />
        #{{ blockDocumentDataValue }}
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PIcon, PTag } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SeparatedList from './SeparatedList.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { Notification } from '@/models'
  import { blockDocumentsApiKey } from '@/services'
  import { inject } from '@/utilities'
  import { mapStateNameToStateType } from '@/utilities/state'

  const props = defineProps<{
    notification: Notification,
  }>()

  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const blockDocument = await blockDocumentsApi.getBlockDocument(props.notification.blockDocumentId)

  const blockDocumentData = computed(() => blockDocument.data)
  const blockDocumentDataKey = computed(() => Object.keys(blockDocumentData.value)[0])
  const blockDocumentDataValue = computed(() => blockDocumentData.value[blockDocumentDataKey.value])
</script>

<style>
.notification-details {
  @apply
    leading-8
}

.notification-details__send-to {
  @apply
  inline-flex
  flex-wrap
  align-bottom
  font-bold
}

 .notification-details__icon {
  @apply
  h-auto
  mr-[2px]
}

  .notification-details__icon--mail {
    @apply
  stroke-gray-400
  }
</style>