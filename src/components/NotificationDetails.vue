<template>
  <div class="notification-details">
    If a run of any flow with
    <template v-if="notification.tags.length">
      <p-tags :tags="allButLastArrayItems(notification.tags)" class="notification-details__tags" />
      <template v-if="notification.tags.length > 1">
        or
      </template>
      <p-tag>{{ lastItemInArray(notification.tags) }}</p-tag>
    </template>
    <template v-else>
      <span class="notification-details__bold">any</span>
    </template>
    tag enters

    <template v-if="notification.states.length">
      a
      <span class="notification-details__tags">
        <template v-for="state in allButLastArrayItems(notification.states)" :key="state.name">
          <StateBadge :state="state" />
        </template>
      </span>
      <template v-if="notification.states.length > 1">
        or
      </template>
      <StateBadge :state="lastItemInArray(notification.states)" class="notification-details__tags" />
    </template>
    <template v-else>
      <span class="notification-details__bold">any</span>
    </template>

    state, send notification to
    <template v-if="isEmail(sendTo)">
      <span class="notification-details__send-to">
        <p-icon icon="MailIcon" class="notification-details__icon notification-details__icon--mail" />
        {{ sendTo }}
      </span>
    </template>
    <template v-else>
      <span class="notification-details__send-to">
        <p-icon icon="Slack" class="notification-details__icon" />
        #{{ sendTo }}
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PIcon, PTag, PTags } from '@prefecthq/prefect-design'
  import StateBadge from '@/components/StateBadge.vue'
  import { Notification } from '@/models'
  import { isEmail } from '@/services/validate'
  import { allButLastArrayItems, lastItemInArray } from '@/utilities/arrays'

  defineProps<{
    notification: Notification,
    sendTo: string,
  }>()
</script>

<style>
.notification-details {
  @apply
    leading-8
}

.notification-details__tags {
  @apply
  inline-flex
  gap-1
  leading-4
  align-middle
}

.notification-details__bold {
  @apply
  font-bold
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