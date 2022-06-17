<template>
  <p-layout-default class="blocks">
    <BlocksPageHeadingsSection />
    <BlocksEmptyStateSection />
    <BlockDocumentsSection />
    <BlockSchemaCapabilitiesSection />
    <BlockTypesSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import { PLayoutDefault } from '@prefecthq/prefect-design'
  import BlockDocumentsSection from '../sections/BlockDocumentsSection.vue'
  import BlockSchemaCapabilitiesSection from '../sections/BlockSchemaCapabilitiesSection.vue'
  import BlocksEmptyStateSection from '../sections/BlocksEmptyStateSection.vue'
  import BlocksPageHeadingsSection from '../sections/BlocksPageHeadingsSection.vue'
  import BlockTypesSection from '../sections/BlockTypesSection.vue'
</script>
