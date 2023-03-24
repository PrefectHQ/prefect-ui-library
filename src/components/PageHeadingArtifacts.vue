<template>
  <PageHeading class="page-heading-artifacts" :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import PageHeading from '@/components/PageHeading.vue'
  import { localization } from '@/localization'
  import { pluralize } from '@/utilities'

  const crumbs: BreadCrumbs = [{ text: pluralize(localization.info.artifact) }]
</script>