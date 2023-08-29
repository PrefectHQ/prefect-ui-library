<template>
  <page-heading class="page-heading-api-keys" :crumbs="crumbs">
    <template #after-crumbs>
      <!-- Note: This doesn't do anything yet -->
      <p-button small icon="PlusIcon" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'

  const crumbs = [{ text: 'API Keys' }]
</script>