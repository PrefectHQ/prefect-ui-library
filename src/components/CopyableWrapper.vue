<template>
  <div class="copyable-wrapper">
    <slot />
    <PButton
      inset
      size="sm"
      class="copyable-wrapper__button"
      title="copy"
      icon="DuplicateIcon"
      @click="copy"
    />
  </div>
</template>

<script lang="ts" setup>
  import { PButton } from '@prefecthq/prefect-design'
  import { copyToClipboard } from '@/utilities/copy'

  const props = defineProps<{
    textToCopy: string,
  }>()

  function copy(): void {
    copyToClipboard(props.textToCopy)
  }
</script>

<style>
.copyable-wrapper { @apply
  relative
}

.copyable-wrapper__button { @apply
  absolute
  top-[2px]
  right-[2px]
}
</style>