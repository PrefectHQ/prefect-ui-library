<template>
  <div class="automation-action-description-send-notification">
    Send {{ indefiniteArticle() }} {{ blockDocument?.blockType.name.toLocaleLowerCase() ?? '' }} notification using
    <BlockIconText :block-document-id="action.blockDocumentId" />
    {{ recipients }}
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { AutomationActionSendNotification } from '@/automations/types/actions'
  import { BlockIconText } from '@/components'
  import { useBlockDocument } from '@/compositions'

  const props = defineProps<{
    action: AutomationActionSendNotification,
  }>()

  const { blockDocument } = useBlockDocument(() => props.action.blockDocumentId)

  const indefiniteArticle = (): string => {
    return ['a', 'e', 'i', 'o', 'u'].includes(blockDocument.value?.blockType.name[0].toLowerCase() ?? '') ? 'an' : 'a'
  }

  const recipients = computed(() => {
    if (blockDocument.value?.blockType.name === 'Email') {
      try {
        return `to ${JSON.parse(blockDocument.value.data.emails as string).join(', ')}`
      } catch (error) {
        return ''
      }
    }
    return ''
  })
</script>

<style>
.automation-action-description-send-notification { @apply
  flex
  flex-wrap
  gap-2
  items-center
}
</style>