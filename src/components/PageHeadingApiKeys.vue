<template>
  <page-heading class="page-heading-api-keys" :crumbs="crumbs">
    <!-- Note: This doesn't do anything yet -->
    <p-button inset size="xs" icon="PlusIcon" />
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'

  const crumbs = [{ text: 'API Keys' }]
</script>