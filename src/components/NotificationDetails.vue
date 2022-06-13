<template>
  <div class="notification-details">
    If a run of any flow with
    <template v-if="notification.tags.length">
      <p-tags :tags="allButLastItems(notification.tags)" class="notification-details__tags" />
      <template v-if="notification.tags.length > 1">
        or
      </template>
      <p-tag>{{ lastItem(notification.tags) }}</p-tag>
    </template>
    <template v-else>
      <span class="notification-details__bold">any</span>
    </template>
    tag enters

    <template v-if="notification.states.length">
      a
      <span class="notification-details__tags">
        <template v-for="state in allButLastItems(notification.states)" :key="state.name">
          <StateBadge :state="state" />
        </template>
        <template v-if="notification.states.length > 1">
          or
        </template>
        <StateBadge :state="lastItem(notification.states)" />
      </span>
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
  import StateBadge from '@/components/StateBadge.vue'
  import { Notification, IState } from '@/models'
  import { isEmail } from '@/services/validate'

  defineProps<{
    notification: Notification,
    sendTo: string,
  }>()

  const lastItem = (items: any): any => items[items.length - 1]
  const allButLastItems = (items: any): any => items.slice(0, -1)
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