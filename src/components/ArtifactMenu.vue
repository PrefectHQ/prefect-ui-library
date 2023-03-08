<template>
  <p-icon-button-menu v-bind="$attrs">
    <copy-overflow-menu-item label="Copy ID" :item="artifact.id" />
    <slot v-bind="{ artifact }" />
  </p-icon-button-menu>
</template>

<script lang="ts">
  export default {
    name: 'ArtifactMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import { Artifact } from '@/models'

  defineProps<{
    artifact: Artifact,
  }>()
</script>