<template>
  <a :href="href" class="documentation-button" target="_blank">
    <p-button v-bind="{ primary, inset }">
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
    primary?: boolean,
    inset?: boolean,
  }>()

  const href = computed(() => localization.docs[props.topic])
  const inset = computed(() => !props.primary)
</script>

<style>
.documentation-button__icon { @apply
  ml-2
  w-5
  h-5
}
</style>