<template>
  <div class="notification-details">
    If a run of any flow with
    <SeparatedList :item-array="notification.tags || []">
      <template #first-items="{ item }">
        <p-tag>{{ item }}</p-tag>
      </template>
      <template #last-item="{ item }">
        <p-tag>{{ item }}</p-tag>
      </template>
    </SeparatedList>

    tag enters

    <SeparatedList :item-array="notification.stateNames || []">
      <template #first-items="{ item }">
        <StateBadge :state="mapStateNameToStateType(item)" />
      </template>
      <template #last-item="{ item }">
        <StateBadge :state="mapStateNameToStateType(item)" />
      </template>
    </SeparatedList>

    state, send a notification to

    <span class="notification-details__send-to">
      <template v-for="item in sendTo.value" :key="item">
        <p-icon :icon="sendTo.icon" class="notification-details__icon" :class="classes" />
        {{ item }}
      </template>
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { Icon, PIcon, PTag } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SeparatedList from './SeparatedList.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { BlockDocumentData, BlockType, Notification } from '@/models'
  import { mapStateNameToStateType } from '@/utilities/state'

  const props = defineProps<{
    notification: Partial<Notification>,
    blockType: BlockType,
    blockDocumentData: BlockDocumentData,
  }>()

  const sendToMapper = (input: BlockDocumentData, type: string): { value: string[] | unknown, icon: Icon } => {
    switch (type) {
      case 'Slack Webhook':
        return {
          value: ['Slack'],
          icon: 'Slack' as Icon,
        }
      default:
        return {
          value: Array.isArray(input[type]) ? input[type] : [input[type]],
          icon: 'BellIcon' as Icon,
        }
    }
  }

  const sendTo = computed(() => sendToMapper(props.blockDocumentData, props.blockType.name))

  const classes = computed(() => ({
    'notification-details__icon--gray': sendTo.value.icon !== 'Slack',
  }))
</script>

<style>
.notification-details {
  @apply
    leading-8
}

.notification-details__send-to {
  @apply
  inline-flex
  gap-1
  flex-wrap
  align-bottom
  font-bold
    items-center
}

.notification-details__icon--gray {
  @apply
stroke-gray-400
}
</style>
