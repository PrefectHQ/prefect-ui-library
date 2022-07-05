<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from './PageHeading.vue'

  const crumbs = [{ text: 'Create Notification' }]
</script>