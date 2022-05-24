<template>
  <page-heading :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <template #default="{ close }">
          <p-overflow-menu-item label="Copy ID" icon="DocumentDuplicateIcon" @click="close" />
        </template>
      </p-icon-button-menu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Deployment } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const crumbs = computed(() => [{ text: props.deployment.name }])
</script>