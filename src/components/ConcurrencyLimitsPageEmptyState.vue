<template>
  <p-empty-state class="concurrency-limit-page-empty-state">
    <template #icon>
      <p-icon icon="Task" />
    </template>

    <template #heading>
      Add a concurrency limit for your task runs
    </template>

    <template #description>
      Creating a limit allows you to limit the number of tasks running
      simultaneously with a given tag.
    </template>

    <template #actions>
      <DocumentationButton :to="localization.docs.concurrency" />
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
  import ConcurrencyLimitsCreateModal from '@/components/ConcurrencyLimitsCreateModal.vue'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { localization } from '@/localization'

  const { showModal, open } = useShowModal()

  const can = useCan()
</script>
