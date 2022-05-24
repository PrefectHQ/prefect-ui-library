<template>
  <page-heading class="page-heading-flows" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'

  const crumbs = [{ text: 'Flows' }]
</script>