<template>
  <page-heading class="page-heading-flow-runs" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'

  const crumbs = [{ text: 'Runs' }]
</script>