<template>
  <div class="automation-action-description-call-webhook">
    Call webhook using
    <BlockIconText :block-document-id="action.blockDocumentId" />
  </div>
</template>

<script lang="ts" setup>
  import { AutomationActionCallWebhook } from '@/automations/types/actions'
  import { BlockIconText } from '@/components'

  defineProps<{
    action: AutomationActionCallWebhook,
  }>()
</script>

<style>
.automation-action-description-call-webhook { @apply
  flex
  flex-wrap
  gap-2
  items-center
}
</style>
