<template>
  <PageHeading :crumbs="[{ text: 'Task Run Concurrency Limits' }]">
    <template #after-crumbs>
      <p-button v-if="can.create.concurrency_limit" small icon="PlusIcon" @click="open" />
    </template>
  </PageHeading>
  <ConcurrencyLimitsCreateModal v-model:showModal="showModal" />
</template>

<script lang="ts" setup>
  import ConcurrencyLimitsCreateModal from '@/components/ConcurrencyLimitsCreateModal.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'

  const can = useCan()
  const { showModal, open } = useShowModal()
</script>