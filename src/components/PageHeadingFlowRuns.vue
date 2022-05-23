<template>
  <page-heading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'

  const crumbs = [{ text: 'Runs' }]
</script>