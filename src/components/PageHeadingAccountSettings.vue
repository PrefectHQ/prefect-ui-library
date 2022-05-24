<template>
  <page-heading class="page-heading-user-settings" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'

  const crumbs = [{ text: 'Account Settings' }]
</script>