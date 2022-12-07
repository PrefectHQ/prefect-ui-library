<template>
  <page-heading class="page-heading-flow-runs" :crumbs="crumbs">
    <template v-if="!hideActions" #actions>
      <SavedFilters />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { defineProps, withDefaults, computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import  SavedFilters from '@/components/SavedFilters.vue'


  const props = withDefaults(defineProps<{
    hideActions?: boolean,
  }>(), {
    hideActions: false,
  })

  const hideActions = computed(() => props.hideActions)

  const crumbs = [{ text: 'Flow Runs' }]
</script>