<template>
  <p-overflow-menu-item :label="label" @click="copy(close)" />
</template>

<script lang="ts" setup>
  import { copyToClipboard } from '@/utilities/copy'

  const props = defineProps<{
    close?: any,
    item: string,
    label: string,
  }>()

  const copy = (close?: () => void): void => {
    copyToClipboard(props.item)

    if (close) {
      close()
    }
  }
</script>