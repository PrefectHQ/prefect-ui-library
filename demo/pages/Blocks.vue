<template>
  <p-layout-default class="blocks">
    <BlocksPageHeadingsSection />
    <BlockDocumentsSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import { PLayoutDefault } from '@prefecthq/prefect-design'
  import BlockDocumentsSection from '../sections/BlockDocumentsSection.vue'
  import BlocksPageHeadingsSection from '../sections/BlocksPageHeadingsSection.vue'
</script>
