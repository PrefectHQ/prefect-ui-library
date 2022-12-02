<template>
  <p-empty-state class="concurrency-limit-page-empty-state">
    <template #icon>
      <p-icon icon="Task" />
    </template>

    <template #heading>
      Add a concurrency limit for your task runs
    </template>

    <template #description>
      Task run concurrency limits let you limit concurrency by tag
    </template>

    <template #actions>
      <DocumentationButton topic="concurrency" />
      <p-button v-if="can.create.concurrency_limit" @click="open">
        Add Concurrency Limit
        <p-icon icon="PlusIcon" />
      </p-button>
      <ConcurrencyLimitsCreateModal v-model:showModal="showModal" />
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
  import ConcurrencyLimitsCreateModal from './ConcurrencyLimitsCreateModal.vue'
  import DocumentationButton from './DocumentationButton.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'

  const { showModal, open } = useShowModal()

  const can = useCan()
</script>