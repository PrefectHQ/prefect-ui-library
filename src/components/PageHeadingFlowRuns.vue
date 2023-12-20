<template>
  <page-heading class="page-heading-flow-runs" :crumbs="crumbs">
    <template v-if="!hideActions" #actions>
      <SavedFilters v-model:filter="filter" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import SavedFilters from '@/components/SavedFilters.vue'
  import { SavedSearchFilter } from '@/models/SavedSearch'

  const props = defineProps<{
    filter: SavedSearchFilter,
    hideActions?: boolean,
  }>()

  const emit = defineEmits<{
    'update:filter': [SavedSearchFilter],
  }>()

  const crumbs = [{ text: 'Flow Runs' }]

  const filter = computed({
    get() {
      return props.filter
    },
    set(filter) {
      emit('update:filter', filter)
    },
  })
</script>