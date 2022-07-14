<template>
  <a :href="href" class="documentation-button" target="_blank">
    <p-button inset class="empty-deployment--link">
      View Docs
      <p-icon icon="ExternalLinkIcon" />
    </p-button>
  </a>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { localization } from '@/localization'

  type Topic = keyof typeof localization.docs

  const props = defineProps<{
    topic: Topic,
  }>()

  const href = computed(() => localization.docs[props.topic])
</script>