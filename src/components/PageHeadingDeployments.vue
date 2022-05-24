<template>
  <page-heading class="page-heading-deployments" :crumbs="crumbs">
    <p-button v-if="false" inset size="xs" icon="PlusIcon" />
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'

  const crumbs = [{ text: 'Deployments' }]
</script>