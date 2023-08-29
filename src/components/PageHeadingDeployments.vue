<template>
  <page-heading class="page-heading-deployments" :crumbs="crumbs">
    <template #after-crumbs>
      <p-button v-if="false" small icon="PlusIcon" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'

  const crumbs = [{ text: 'Deployments' }]
</script>