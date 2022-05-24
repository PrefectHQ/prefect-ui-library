<template>
  <page-heading class="page-heading-queues" :crumbs="crumbs">
    <p-button inset size="xs" icon="PlusIcon" />
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'

  const crumbs = [{ text: 'Queues' }]
</script>