<template>
  <page-heading class="page-heading-flow" :crumbs="crumbs">
    <template #actions>
      <p-icon-button-menu>
        <template #default="{ close }">
          <p-overflow-menu-item label="Copy ID" @click="copyId(flow.id); close()" />
          <p-overflow-menu-item label="Delete" />
        </template>
      </p-icon-button-menu>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PIconButtonMenu } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Flow } from '@/models'
  import { copyId } from '@/utilities/copy'

  const props = defineProps<{
    flow: Flow,
  }>()

  const crumbs = computed(() => [{ text: props.flow.name }])
</script>