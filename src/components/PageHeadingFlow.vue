<template>
  <page-heading class="page-heading-flow" :crumbs="crumbs">
    <template #actions>
      <FlowMenu :flow="flow" @delete="deleteFlow" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FlowMenu from '@/components/FlowMenu.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { Flow } from '@/models'

  const props = defineProps<{
    flow: Flow,
  }>()

  const crumbs = computed(() => [{ text: props.flow.name }])
  const emit = defineEmits(['delete'])
  const deleteFlow = (id: string): void => {
    emit('delete', id)
  }
</script>