<template>
  <page-heading class="page-heading-flow-runs" :crumbs="crumbs">
    <template #actions>
      <FlowRunsFilterSelect v-model:selected="selectedFilter" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import  FlowRunsFilterSelect from '@/components/FlowRunsFilterSelect.vue'
  import PageHeading from '@/components/PageHeading.vue'

  const crumbs = [{ text: 'Flow Runs' }]
  const emit = defineEmits<{
    (event: 'update:selected', value: string): void,
  }>()

  const props = defineProps<{
    selected: string,
  }>()

  const selectedFilter = computed({
    get() {
      return props.selected
    },
    set(value: string) {
      emit('update:selected', value)
    },
  })
</script>