<template>
  <div class="notification-details">
    If a run of any flow with <span v-if="notification.tags?.length">a</span>
    <SeparatedList :item-array="notification.tags || []">
      <template #first-items="{ item }">
        <span class="notification-details__tag">
          <p-tag>{{ item }}</p-tag>
        </span>
      </template>
      <template #last-item="{ item }">
        <span class="notification-details__tag">
          <p-tag>{{ item }}</p-tag>
        </span>
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
        <p-icon v-if="item" :icon="sendTo.icon" class="notification-details__icon" :class="classes" />
        <span class="notification-details__item">{{ item }}</span>
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
    data: BlockDocumentData,
  }>()

  const toArray = (value: string | string[] | unknown): string[] => Array.isArray(value) ? value : [value]

  const sendToMapper = (input: BlockDocumentData, type: string): { value: string[] | unknown, icon: Icon } => {
    switch (type) {
      case 'Email Addresses':
        return {
          value: toArray(input.email_addresses),
          icon: 'MailIcon' as Icon,
        }
      case 'Slack Webhook':
        return {
          value: toArray('Slack'),
          icon: 'Slack' as Icon,
        }
      default:
        return {
          value: toArray(Object.values(input)[0]),
          icon: 'BellIcon' as Icon,
        }
    }
  }

  const sendTo = computed(() => sendToMapper(props.data, props.blockType.name))

  const classes = computed(() => ({
    'notification-details__icon--gray': sendTo.value.icon !== 'Slack',
  }))
</script>

<style>
.notification-details {
  @apply
    inline-flex
    flex-wrap
    gap-1
    items-center
}

.notification-details__tag {
  inline-size: max-content;
}

.notification-details__send-to {
  @apply
  inline-flex
  gap-1
  flex-wrap
  align-bottom
  items-center
  font-bold
}

.notification-details__item {
  @apply
  empty:border-b-2
  empty:w-32
  empty:border-black
  empty:mb-2.5
  empty:h-20
}

.notification-details__icon--gray {
  @apply
  stroke-gray-400
}
</style>
