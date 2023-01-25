<template>
  <a :href="to" class="documentation-button" target="_blank">
    <p-button inset>
      <slot>
        View Docs
      </slot>
      <p-icon icon="ExternalLinkIcon" class="documentation-button__icon" />
    </p-button>
  </a>
</template>

<script lang="ts" setup>
  defineProps<{
    to: string,
  }>()
</script>

<style>
.documentation-button__icon { @apply
  ml-2
  w-5
  h-5
}
</style>