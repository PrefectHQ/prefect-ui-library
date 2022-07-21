<template>
  <a :href="href" class="documentation-button" target="_blank">
    <p-button inset>
      <slot>
        View Docs
      </slot>
      <p-icon icon="ExternalLinkIcon" class="documentation-button__icon" />
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

<style>
.documentation-button__icon { @apply
  ml-2
  w-5
  h-5
}
</style>