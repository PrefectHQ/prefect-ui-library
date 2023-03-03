<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="flow.id" />
    <slot v-bind="{ flow }" />
  </p-icon-button-menu>
</template>

<script lang="ts">
  export default {
    name: 'FlowMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { Flow } from '@/models'

  defineProps<{
    flow: Flow,
  }>()
</script>