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
        <span class="notification-details__send-to-pair">
          <p-icon :icon="sendTo.icon" class="notification-details__icon" :class="classes" />
          {{ item }}
        </span>
      </template>
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { Icon, PIcon, PTag } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SeparatedList from './SeparatedList.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { Notification } from '@/models'
  import { blockDocumentsApiKey } from '@/services'
  import { inject } from '@/utilities'
  import { mapStateNameToStateType } from '@/utilities/state'

  const props = defineProps<{
    notification: Partial<Notification>,
    sendToInput?: string[] | string,
    sendToType?: string,
  }>()


  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const blockDocument = props.notification.blockDocumentId ? await blockDocumentsApi.getBlockDocument(props.notification.blockDocumentId) : null
  const blockDocumentType = computed(()=> blockDocument?.blockType.name ?? '')
  const blockDocumentData = computed(() => blockDocument?.data)
  const blockDocumentDataKey = computed(() => blockDocumentData.value ? Object.keys(blockDocumentData.value)[0] : null)
  const blockDocumentDataValue = computed(() => blockDocumentData.value && blockDocumentDataKey.value ? blockDocumentData.value[blockDocumentDataKey.value] as string[] : null)


  const sendToMapper = (input: string[] | string, type: string): { value: string[], icon: Icon } => {
    const arrayInput = Array.isArray(input) ? input : [input]
    switch (type) {
      case 'Email Addresses':
        return {
          value: arrayInput,
          icon: 'MailIcon' as Icon,
        }
      case 'Slack Webhook':
        return {
          value: ['Slack'],
          icon: 'Slack' as Icon,
        }
      default:
        return {
          value: arrayInput,
          icon: 'bellIcon' as Icon,
        }
    }
  }

  const sendTo = computed(() => {
    if (props.sendToInput) {
      return sendToMapper(props.sendToInput, props.sendToType!)
    } else if (blockDocumentDataValue.value) {
      return sendToMapper(blockDocumentDataValue.value, blockDocumentType.value)
    }
    return sendToMapper('', '')
  })

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
}

.notification-details__send-to-pair {
  @apply
  inline-flex
  items-center
  gap-[1px]
}

.notification-details__icon--gray {
  @apply
stroke-gray-400
}
</style>